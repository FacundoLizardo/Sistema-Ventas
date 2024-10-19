import { Op, WhereOptions } from "sequelize";
import { Request } from "express";
import { serviceError } from "../utils/serviceError";
import { ProductInterface } from "../models/product";
import { Product } from "../db";

type ProductFilterConditions = {
  [Op.or]?: Array<WhereOptions<ProductInterface>>;
};

class ProductService {
  async getFilteredProducts({ req }: { req: Request }) {
    const { query, page } = req.query;
    const pageSize = 6;
    const pageNumber = Number(page) || 1;

    try {
      const filterConditions: ProductFilterConditions = {};

      if (query) {
        filterConditions[Op.or] = [
          {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            barcode: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ];
      }

      const products = await Product.findAll({
        where: filterConditions,
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
      });

      const totalCount = await Product.count({
        where: filterConditions,
      });

      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        products,
        totalCount,
        currentPage: pageNumber,
        totalPages,
      };
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new ProductService();
