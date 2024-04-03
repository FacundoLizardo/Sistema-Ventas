const { Router } = require("express");
const {
	getProduct,
	getProducts,
	postProducts,
	putProduct,
	deleteProduct,
	getCategories
} = require("../handlers/productsHandler");

const router = Router();

router.get("/id/:id", getProduct);
router.get("/", getProducts);
router.get("/categories", getCategories)
router.post("/", postProducts);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
