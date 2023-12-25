const Router = require("express");
const { getSales, postSale, putSale, deleteSale } = require("../Handlers/salesHandlres");

const router = Router();

router.get("/:id", getSales)
router.post("/", postSale)
router.put("/:id", putSale)
router.delete(":id", deleteSale)

module.exports = router;