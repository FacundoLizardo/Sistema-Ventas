const { Product } = require("../../db")

const getProductsController = async () => {
    try {
        const products = await Product.findAll();
        return products || [];
    } catch (error) {
        throw new Error(`Error while fetching products: ${error.message}`);
    }
}

module.exports = { getProductsController }