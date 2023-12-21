const { Router } = require('express');
const { getProduct, getProducts, postProducts, putProduct, deleteProduct } = require('../Handlers/handlersProducts');

const router = Router();

router.get("/", getProduct);
router.get("/", getProducts);
router.post("/", postProducts);
router.put("/", putProduct);
router.delete("/", deleteProduct);

module.exports = router;
