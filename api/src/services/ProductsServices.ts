import { Op, WhereOptions } from "sequelize";
import { Product, Stock, Category, SubCategory } from "../db";
import {
  ProductInterface,
  ProductCreationInterface,
  ProductWithStockCreationInterface,
} from "../models/product";
import { serviceError } from "../utils/serviceError";
import StockServices from "./StockServices";
import { IncludeOptions } from "sequelize/types";

class ProductService {
  async getProducts({
    companyId,
    branchId,
    name,
  }: {
    companyId: string;
    branchId?: string;
    name?: string;
  }) {
    try {
      const whereCondition: WhereOptions = { companyId };

      const include: IncludeOptions[] = [
        { model: Category, as: "category" },
        { model: SubCategory, as: "subCategory" },
      ];

      if (branchId) {
        include.push({
          model: Stock,
          as: "stock",
          required: true,
          where: { branchId },
        } as IncludeOptions);
      }

      if (name) {
        whereCondition.name = {
          [Op.like]: `%${name}%`,
        };
      }

      const products = await Product.findAll({
        where: whereCondition,
        include,
        order: [["name", "ASC"]],
      });

      return products
        ? products.map((productObj) => productObj.get({ plain: true }))
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postProduct(
    data: ProductCreationInterface,
    companyId: string
  ): Promise<ProductInterface | string> {
    try {
      const existingProduct = await Product.findOne({
        where: {
          name: data.name,
        },
      });

      if (existingProduct) {
        return "Product already exists.";
      }

      const product = await Product.create({
        ...data,
        companyId,
      });

      if (product) {
        return product.get({ plain: true }) as ProductInterface;
      } else {
        return "Product not created, please try again.";
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async putProduct(id: string, data: ProductWithStockCreationInterface) {
    try {
      const existingProduct = await Product.findOne({ where: { id } });

      if (!existingProduct) {
        return `The product with id: ${id} does not exist`;
      }

      const { stock, ...productData } = data;

      if (productData.subCategoryId === "") {
        delete productData.subCategoryId;
      }

      await existingProduct.update(productData);

      if (stock) {
        const stockUpdates = stock.map((item) =>
          StockServices.putStock(item.id, item)
        );

        await Promise.all(stockUpdates);
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const deletedCount = await Product.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new Error("Product not found");
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new ProductService();

//---------- TESTS ----------

/* 
    {
      "name": "chacabuco",
      "categoryId": "6022d12f-bb91-4b51-88cc-66cb320912a3",
      "cost": 222,
      "finalPrice": 266,
      "discount": 0,
      "profitPercentage": 20,
      "allowNegativeStock": false,
      "trackStock": false,
      "minimumStock": 0,
      "enabled": true,
      "notesDescription": "",
      "barcode": "13235265"
    }
*/
