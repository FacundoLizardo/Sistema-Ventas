const { Product } = require("../../db")

const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id)
        return product || []
    } catch (error) {
        throw new Error("Error retrieving product from database.")
    }
}

module.exports = getProductById