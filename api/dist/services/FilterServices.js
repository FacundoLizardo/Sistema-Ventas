"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const serviceError_1 = require("../utils/serviceError");
const db_1 = require("../db");
class ProductService {
    getFilteredProducts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ req }) {
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
                const products = yield db_1.Product.findAll({
                    where: filterConditions,
                    limit: pageSize,
                    offset: (pageNumber - 1) * pageSize,
                });
                const totalCount = yield db_1.Product.count({
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
        });
    }
}
exports.default = new ProductService();
