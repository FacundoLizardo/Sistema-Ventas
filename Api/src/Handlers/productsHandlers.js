const createProductController = require("../Controllers/products/createProductController");
const deleteProductController = require("../Controllers/products/deleteProductController");
const getAllProductsController = require("../Controllers/products/getAllProductsController");
const getProductByIdController = require("../Controllers/products/getProductByIdController");
const updateProductController = require("../Controllers/products/updateProductController");



const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await getProductByIdController(id)
        product
            ? res.status(200).json({ success: true, product })
            : res.status(404).json({ success: false, message: "No products found." })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await getAllProductsController()
        products
            ? res.status(200).json({ success: true, products })
            : res.status(404).json({ success: false, message: "No products found." })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const postProducts = async (req, res) => {
    const { name, category, cost, finalPrice, discount, profitPercentage, quantity, enabled, notesDescription, taxes, barcode } = req.body
    if (!name || !category || !quantity) { return res.status(404).json("Missing information.") }
    try {
        const newProduct = await createProductController(name, category, cost, finalPrice, discount, profitPercentage, quantity, enabled, notesDescription, taxes, barcode)
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const putProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, category, cost, finalPrice, discount, profitPercentage, quantity, enabled, notesDescription, taxes, barcode } = req.body;

        const updatedProduct = await updateProductController(
            productId,
            name,
            category,
            cost,
            finalPrice,
            discount,
            profitPercentage,
            quantity,
            enabled,
            notesDescription,
            taxes,
            barcode
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await deleteProductController(productId)
        res.status(200).json(deletedProduct)


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