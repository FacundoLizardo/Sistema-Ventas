const { Product } = require("../../db");

const deleteProductController = async (productId) => {
	try {
		const deleteProduct = await Product.destroy({
			where: { productId: productId },
		});
		if (deleteProduct === 0) {
			return `Operation whit the ID: ${productId} does not exist`;
		}
		return deleteProduct;
	} catch (error) {
		throw new Error(
			`Error while processing product deletion: ${error.message}`
		);
	}
};

module.exports = { deleteProductController };
