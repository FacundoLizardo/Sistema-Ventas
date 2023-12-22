const { Router } = require("express");
const { getProductInCart, postProductToCart, deleteProductFromCart } = require("../Handlers/cartHandlers");

const router = Router()

router.get("/", getProductInCart);
router.post("/", postProductToCart);
router.delete("/:id", deleteProductFromCart);

module.exports = router