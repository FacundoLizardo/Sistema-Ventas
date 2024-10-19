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
exports.updateProductStock = updateProductStock;
const db_1 = require("../db");
/**
 * Updates the stock of products within a transaction.
 * @param products - Array of products to update with their new stock values.
 * @param transaction - Sequelize transaction instance.
 * @throws Will throw an error if a product or stock is not found.
 */
function updateProductStock(products, branchId, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const product of products) {
            const productRecord = yield db_1.Product.findByPk(product.id, { transaction });
            if (!productRecord) {
                yield transaction.rollback();
                throw new Error(`Product with ID ${product.id} not found.`);
            }
            const stockRecord = yield db_1.Stock.findOne({
                where: { productId: product.id, branchId },
                transaction,
            });
            if (!stockRecord) {
                yield transaction.rollback();
                throw new Error(`Stock for product with ID ${product.id} and branch ID ${branchId} not found.`);
            }
            const newStock = stockRecord.dataValues.quantity - 1;
            yield db_1.Stock.update({ quantity: newStock }, { where: { id: stockRecord.get('id') }, transaction });
        }
    });
}
