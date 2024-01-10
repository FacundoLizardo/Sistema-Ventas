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
		const existingProduct = await Product.findOne({
			where: { productId: productId },
		});

		if (!existingProduct) {
			throw new Error(`The product whit the id:${productId} does not exist`);
		}
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
