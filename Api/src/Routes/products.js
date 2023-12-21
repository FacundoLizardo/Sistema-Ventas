const { Router } = require('express');
const { getProduct, getProducts, postProducts, putProduct, deleteProduct } = require('../Handlers/handlersProducts');

const router = Router();

router.get("/:id", getProduct);
router.get("/", getProducts);
router.post("/", postProducts);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
