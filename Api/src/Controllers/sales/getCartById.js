import { Cart } from "../../db";

const getCartById = async ({ userId }) => {
    try {
        const cart = await Cart.findByPk(userId);
        return cart || [];
    } catch (error) {
        throw new Error("Error while fetching cart from the database");
    }
}

module.exports = getCartById;