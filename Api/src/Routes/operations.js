const { Router } = require("express");
const {
	getOperation,
	getAllOperations,
	postOperation,
	putOperation,
	deleteOperation,
} = require("../Handlers/operationsHandler");

const router = Router();

router.get("/:id", getOperation);
router.get("/", getAllOperations);
router.post("/", postOperation);
router.put("/:id", putOperation);
router.delete("/:id", deleteOperation);

module.exports = router;
