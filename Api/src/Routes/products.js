const { Router } = require('express');
const { getProduct, getProducts, postProducts, putProduct, deleteProduct, getPaginateProducts } = require('../Handlers/productsHandlers');

const router = Router();

router.get("/:id", getProduct);
//router.get("/", getProducts);
router.get("/", getPaginateProducts);
router.post("/", postProducts);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
