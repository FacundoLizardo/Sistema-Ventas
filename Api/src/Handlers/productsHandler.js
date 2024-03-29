const {
	postProductController,
} = require("../Controllers/products/postProductController");
const {
	deleteProductController,
} = require("../Controllers/products/deleteProductController");
const {
	putProductController,
} = require("../Controllers/products/putProductController");
const {
	getProductController,
} = require("../Controllers/products/getProductController");
const {
	getProductsController,
} = require("../Controllers/products/getProductsController");

const getProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await getProductController(id);
		product
			? res.status(200).json({ success: true, product })
			: res.status(404).json({ success: false, message: "No products found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const getProducts = async (req, res) => {
	try {
		const products = await getProductsController();
		return res.status(200).json(products);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};


const postProducts = async (req, res) => {
	const {
		name,
		category,
		cost,
		finalPrice,
		discount,
		profitPercentage,
		stock,
		allowNegativeStock,
		trackStock,
		minimumStock,
		enabled,
		notesDescription,
		taxes,
		barcode,
	} = req.body;
	if (!name || !category || !stock) {
		return res.status(404).json("Missing information.");
	}
	try {
		const newProduct = await postProductController(
			name,
			category,
			cost,
			finalPrice,
			discount,
			profitPercentage,
			stock,
			allowNegativeStock,
			trackStock,
			minimumStock,
			enabled,
			notesDescription,
			taxes,
			barcode
		);
		return res.status(200).json(newProduct);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const putProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const {
			name,
			category,
			cost,
			finalPrice,
			discount,
			profitPercentage,
			stock,
			allowNegativeStock,
			trackStock,
			minimumStock,
			enabled,
			notesDescription,
			taxes,
			barcode,
		} = req.body;

		const updatedProduct = await putProductController(
			productId,
			name,
			category,
			cost,
			finalPrice,
			discount,
			profitPercentage,
			stock,
			allowNegativeStock,
			trackStock,
			minimumStock,
			enabled,
			notesDescription,
			taxes,
			barcode
		);
		res.status(200).json(updatedProduct);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const deletedProduct = await deleteProductController(productId);
		res.status(200).json(deletedProduct);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getProduct,
	getProducts,
	postProducts,
	putProduct,
	deleteProduct,
};
