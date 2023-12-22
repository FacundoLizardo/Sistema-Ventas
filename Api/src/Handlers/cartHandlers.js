const addProductController = require("../Controllers/cart/addProductController");

const getProductInCart = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const postProductToCart = async (req, res) => {
    const { name, category, cost, finalPrice, discount, profitPercentage, quantity, enabled, notesDescription, taxes, barcode } = req.body
    try {
        const newProduct = await addProductController(name, category, cost, finalPrice, discount, profitPercentage, quantity, enabled, notesDescription, taxes, barcode)
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteProductFromCart = async (req, res) => {
    try {


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProductInCart,
    postProductToCart,
    deleteProductFromCart
}