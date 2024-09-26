import { WhereOptions } from "sequelize";
import { Product, Stock } from "../db";
import { ProductInterface, ProductCreationInterface } from "../models/product";
import { serviceError } from "../utils/serviceError";
import StockServices from "./StockServices";

class ProductService {
  async getProduct(name: string) {
    try {
      const whereClause: WhereOptions = { name };

      const product = await Product.findOne({
        where: whereClause,
        include: [{ model: Stock, as: "stock" }],
      });

      return product
        ? (product.get({ plain: true }) as ProductInterface)
        : null;
    } catch (error) {
      serviceError(error);
    }
  }

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
      const whereClause: WhereOptions = { companyId };

      if (branchId) {
        whereClause.branchId = branchId;
      }

      if (name) {
        whereClause.name = name;
      }

      const products = await Product.findAll({
        where: whereClause,
        include: [{ model: Stock, as: "stock" }],
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
    data: Omit<ProductCreationInterface, "stock">,
    companyId: string,
    branchId: string,
    stock: number
  ): Promise<ProductInterface | string> {
    try {
      const existingProduct = await Product.findOne({
        where: {
          name: data.name,
          branchId: branchId,
        },
      });

      if (existingProduct) {
        return "Product already exists in this branch.";
      }

      const product = await Product.create({
        ...data,
        companyId,
        branchId,
      });

      if (product) {
        await StockServices.postStock(
          {
            branchId,
            productId: product.getDataValue("id"),
            quantity: stock,
          },
          companyId
        );

        return product.get({ plain: true }) as ProductInterface;
      } else {
        return "Product not created because it already exists or something is wrong, please try again.";
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
