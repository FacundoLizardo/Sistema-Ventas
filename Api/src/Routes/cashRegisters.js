const { Router } = require("express");
const {
	getCashRegister,
	getAllCashRegisters,
	postCashRegister,
	putCashRegister,
	deleteCashRegister,
} = require("../Handlers/cashRegisterHandler");
const router = Router();

router.get("/:id", getCashRegister);
router.get("/", getAllCashRegisters);
router.post("/", postCashRegister);
router.put("/:id", putCashRegister);
router.delete("/:id", deleteCashRegister);

module.exports = router;
