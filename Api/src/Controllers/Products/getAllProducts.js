const { Product } = require("../../db")

const getAllProducts = async () => {
    try {
        const products = await Product.findAll();
        return products || [];
    } catch (error) {
        throw new Error("Error while fetching products from the database");
    }
}

module.exports = getAllProducts