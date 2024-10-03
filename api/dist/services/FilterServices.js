"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const serviceError_1 = require("../utils/serviceError");
const db_1 = require("../db");
class ProductService {
    async getFilteredProducts({ req }) {
        const { query, page } = req.query;
        const pageSize = 6;
        const pageNumber = Number(page) || 1;
        try {
            const filterConditions = {};
            if (query) {
                filterConditions[sequelize_1.Op.or] = [
                    {
                        name: {
                            [sequelize_1.Op.iLike]: `%${query}%`,
                        },
                    },
                    {
                        barcode: {
                            [sequelize_1.Op.iLike]: `%${query}%`,
                        },
                    },
                ];
            }
            const products = await db_1.Product.findAll({
                where: filterConditions,
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
            });
            const totalCount = await db_1.Product.count({
                where: filterConditions,
            });
            const totalPages = Math.ceil(totalCount / pageSize);
            return {
                products,
                totalCount,
                currentPage: pageNumber,
                totalPages,
            };
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new ProductService();
