const { Product } = require("../../db");

const putProductController = async (
	productId,
	name,
	category,
	cost,
	finalPrice,
	discount,
	profitPercentage,
	stock,
	enabled,
	notesDescription,
	taxes,
	barcode
) => {
	try {
		const updatedAt = new Date().toISOString();
		const updatedProduct = await Product.update(
			{
				name,
				category,
				cost,
				finalPrice,
				discount,
				profitPercentage,
				stock,
				enabled,
				notesDescription,
				taxes,
				barcode,
				updatedAt,
			},
			{
				where: { productId: productId },
			}
		);

		return updatedProduct;
	} catch (error) {
		throw new Error(error.message);
	}
};

const putProductStockController = async ({ productId, stock }) => {
	try {
		const product = await Product.findByPk(productId);

		if (product) {
			await product.update({
				stock: product.stock - 1,
			});
			return true;
		} else {
			throw new Error(`Product with ID ${productId} not found`);
		}
	} catch (error) {
		console.error("Error updating product stock.");
		throw new Error(error.message);
	}
};

module.exports = { putProductController, putProductStockController };
