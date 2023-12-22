const { Product } = require("../../db")

const getAllProductsController = async () => {
    try {
        const products = await Product.findAll();
        return products || [];
    } catch (error) {
        throw new Error("Error while fetching products from the database");
    }
}

module.exports = getAllProductsController