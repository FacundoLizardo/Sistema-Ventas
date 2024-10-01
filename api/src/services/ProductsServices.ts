import { WhereOptions } from "sequelize";
import { Product, Stock, Category, SubCategory } from "../db";
import { ProductInterface, ProductCreationInterface } from "../models/product";
import { serviceError } from "../utils/serviceError";
import StockServices from "./StockServices";

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

      if (branchId) {
        whereCondition.branchId = branchId;
      }

      if (name) {
        whereCondition.name = name;
      }

      const products = await Product.findAll({
        where: whereCondition,
        include: [
          { model: Stock, as: "stock" },
          { model: Category, as: "category" },
          { model: SubCategory, as: "subCategory" },
        ],
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
    companyId: string,
    stock: Array<{ branchId: string; quantity: number }>
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
        for (const item of stock) {
          await StockServices.postStock({
            branchId: item.branchId,
            productId: product.getDataValue("id"),
            quantity: item.quantity,
          });
        }

        return product.get({ plain: true }) as ProductInterface;
      } else {
        return "Product not created, please try again.";
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async putProduct(
    id: string,
    data: ProductCreationInterface
  ): Promise<boolean | string> {
    try {
      const existingProduct = await Product.findOne({ where: { id } });

      if (!existingProduct) {
        return `The product with id: ${id} does not exist`;
      }

      await existingProduct.update(data);
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
        "name": "Tinto",
        "category": "Vinos",
        "cost": 50.00,
        "finalPrice": 75.00,
        "discount": 10.00,
        "profitPercentage": 20,
        "stock": 100,
        "enabled": true,
        "notesDescription": "Descripción de prueba",
        "taxes": 5.00,
        "barcode": "231351655648",
        "branchId": "cb4f49aa-13f0-4b5f-805b-d8242e6987b1",
        "userId": "b3b10faa-9c9e-425e-acc4-6ec1ad574bda"
    }
*/
