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
const serviceError_1 = require("../utils/serviceError");
const db_1 = require("../db");
class StockServices {
    getStock(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, branchId }) {
            try {
                const user = yield db_1.Stock.findOne({
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
        });
    }
    getStocks(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stocks = yield db_1.Stock.findAll({ where: { companyId } });
                return stocks
                    ? stocks.map((userObj) => userObj.get({ plain: true }))
                    : [];
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    postStock(data, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [stock, created] = yield db_1.Stock.findOrCreate({
                    where: { branchId: data.branchId, productId: data.productId },
                    defaults: Object.assign(Object.assign({}, data), { companyId }),
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
        });
    }
}
exports.default = new StockServices();
