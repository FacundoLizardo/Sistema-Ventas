const createProduct = require("../Controllers/Products/createProduct");
const getAllProducts = require("../Controllers/Products/getAllProducts");
const getProductById = require("../Controllers/Products/getProductById");


const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await getProductById(id)
        product
            ? res.status(200).json({ success: true, product })
            : res.status(404).json({ success: false, message: "No products found." })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts()
        products
            ? res.status(200).json({ success: true, products })
            : res.status(404).json({ success: false, message: "No products found." })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const postProducts = async (req, res) => {
    const { product_id, name, category, cost, final_price, discount, profit_percentage, quantity, enabled, notes_description, taxes, barcode } = req.body
    if (!product_id || !name || !category || !cost || !final_price || !discount || !profit_percentage || !quantity || !enabled || !notes_description || !taxes || !barcode) { return res.status(404).json("Missing information.") }
    try {
        const newProduct = await createProduct(product_id, name, category, cost, final_price, discount, profit_percentage, quantity, enabled, notes_description, taxes, barcode)
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const putProduct = (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteProduct = (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProduct,
    getProducts,
    postProducts,
    putProduct,
    deleteProduct
}