const { Cart, Product } = require("../../db");
const { v4: uuidv4 } = require('uuid');

const postCartController = async (productId) => {
    const userId = "db2645f2-1c76-445d-88a0-8fdac74c7661";
    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("Product not found.");
        }

        let cart = await Cart.findOne({
            where: { userId: userId }
        });

        if (!cart) {
            // Si no se encuentra el carrito, se crea uno nuevo
            cart = await Cart.create({ userId: userId });
        }

        await cart.addProduct(product);
        return 'Product added to cart successfully';

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = postCartController;
