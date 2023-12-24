const postCartController = require("../Controllers/sales/postCartController");

const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await getCartById(userId);
        cart
            ? res.status(200).json({ cart })
            : res.status(404).json({ message: "No products found." })

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const postCart = async (req, res) => {
    const { productId } = req.body
    try {
        const result = await postCartController(productId);
        return res.status(200).json({ message: result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteCart = async (req, res) => {
    try {


    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getCart,
    postCart,
    deleteCart
}