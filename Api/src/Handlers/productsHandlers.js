const postProductController = require("../Controllers/products/postProductController");
const deleteProductController = require("../Controllers/products/deleteProductController");
const getAllProductsController = require("../Controllers/products/getAllProductsController");
const getProductByIdController = require("../Controllers/products/getProductByIdController");
const putProductController = require("../Controllers/products/putProductController");
const getPaginatedProductsController = require("../Controllers/products/getPaginatedProductsController");



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
        const { page } = req.query
        let products;

        if (page) {

            const pageNumber = parseInt(page) || 1;
            const pageSize = 5

            const paginatedProducts = await getPaginatedProductsController(pageNumber, pageSize)

            if (paginatedProducts.products.length === 0) {
                return res.status(404).json({ succes: false, masagge: "No products found for this page." })
            }

            return res.status(200).json({
                success: true,
                currentPage: pageNumber,
                totalPages: paginatedProducts.totalPages,
                products: paginatedProducts.products
            });
        } else {
            products = await getAllProductsController();
        }

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found." });
        }

        return res.status(200).json({ success: true, products });


    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const postProducts = async (req, res) => {
    const { name, category, cost, finalPrice, discount, profitPercentage, stock, enabled, notesDescription, taxes, barcode } = req.body
    if (!name || !category || !stock) { return res.status(404).json("Missing information.") }
    try {
        const newProduct = await postProductController(name, category, cost, finalPrice, discount, profitPercentage, stock, enabled, notesDescription, taxes, barcode)
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const putProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, category, cost, finalPrice, discount, profitPercentage, stock, enabled, notesDescription, taxes, barcode } = req.body;

        const updatedProduct = await putProductController(
            productId,
            name,
            category,
            cost,
            finalPrice,
            discount,
            profitPercentage,
            stock,
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
    deleteProduct,
}