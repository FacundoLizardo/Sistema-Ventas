const createProduct = require("../Controllers/Products/createProduct")

const getProduct = (req, res) => {
    try {

    } catch (error) {
        handlerErrorHttp(res, "ERROR: GET_PRODUCT", error)
    }
}

const getProducts = (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const postProducts = async (req, res) => {
    const { product_id, name, category, cost, final_price, discount, profit_percentage, quantity, enabled, notes_description, taxes, barcode } = req.body
    try {
        const newProduct = await createProduct(product_id, name, category, cost, final_price, discount, profit_percentage, quantity, enabled, notes_description, taxes, barcode)
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const putProduct = (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteProduct = (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getProduct,
    getProducts,
    postProducts,
    putProduct,
    deleteProduct
}