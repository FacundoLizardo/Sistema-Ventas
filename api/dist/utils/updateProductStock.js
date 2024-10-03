"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStock = updateProductStock;
const db_1 = require("../db");
/**
 * Updates the stock of products within a transaction.
 * @param products - Array of products to update with their new stock values.
 * @param transaction - Sequelize transaction instance.
 * @throws Will throw an error if a product or stock is not found.
 */
async function updateProductStock(products, branchId, transaction) {
    for (const product of products) {
        const productRecord = await db_1.Product.findByPk(product.id, { transaction });
        if (!productRecord) {
            await transaction.rollback();
            throw new Error(`Product with ID ${product.id} not found.`);
        }
        const stockRecord = await db_1.Stock.findOne({
            where: { productId: product.id, branchId },
            transaction,
        });
        if (!stockRecord) {
            await transaction.rollback();
            throw new Error(`Stock for product with ID ${product.id} and branch ID ${branchId} not found.`);
        }
        const newStock = stockRecord.dataValues.quantity - 1;
        await db_1.Stock.update({ quantity: newStock }, { where: { id: stockRecord.get('id') }, transaction });
    }
}
