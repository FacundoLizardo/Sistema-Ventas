const { Product } = require("../../db")

const deleteProductController = async (productId) => {
    try {
        const deleteProduct = await Product.destroy({
            where: { productId: productId }
        })
        return deleteProduct
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = deleteProductController