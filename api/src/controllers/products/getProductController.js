const { Product } = require("../../db")

const getProductController = async (id) => {
    try {
        const product = await Product.findByPk(id)
        return product || []
    } catch (error) {
        throw new Error(`Error retrieving product from database: ${error.message}`);
    }
}


module.exports = { getProductController }