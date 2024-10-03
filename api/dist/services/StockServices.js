"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceError_1 = require("../utils/serviceError");
const db_1 = require("../db");
class StockServices {
    async getStock({ id, branchId }) {
        try {
            const user = await db_1.Stock.findOne({
                where: {
                    id: id,
                    branchId: branchId,
                },
            });
            return user;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async getStocks(companyId) {
        try {
            const stocks = await db_1.Stock.findAll({ where: { companyId } });
            return stocks
                ? stocks.map((userObj) => userObj.get({ plain: true }))
                : [];
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postStock(data, companyId) {
        try {
            const [stock, created] = await db_1.Stock.findOrCreate({
                where: { branchId: data.branchId, productId: data.productId },
                defaults: {
                    ...data,
                    companyId,
                },
            });
            if (created) {
                return stock.get({ plain: true });
            }
            else {
                return "Stock not created because it already exists or something went wrong, please try again.";
            }
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new StockServices();
