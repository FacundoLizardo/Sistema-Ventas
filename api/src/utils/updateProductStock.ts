import { Transaction } from "sequelize";
import { Product } from "../db";

/**
 * Updates the stock of products within a transaction.
 * @param products - Array of products to update with their new stock values.
 * @param transaction - Sequelize transaction instance.
 * @throws Will throw an error if a product is not found.
 */

export async function updateProductStock(
  products: { id: string; quantity: number }[],
  transaction: Transaction
): Promise<void> {
  for (const product of products) {
    const productRecord = await Product.findByPk(product.id, { transaction });

    if (!productRecord) {
      await transaction.rollback();
      throw new Error(`Product with ID ${product.id} not found.`);
    }

    const newStock = productRecord.dataValues.stock - 1;

    await Product.update(
      { stock: newStock },
      { where: { id: product.id }, transaction }
    );
  }
}
