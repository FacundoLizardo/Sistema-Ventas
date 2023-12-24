const { Router } = require("express");
const { getCart, postCart, deleteCart } = require("../Handlers/cartHandlers");

const router = Router()

router.get("/:id", getCart);
router.post("/", postCart);
router.delete("/:id", deleteCart);

module.exports = router