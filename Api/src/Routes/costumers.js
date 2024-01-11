const { Router } = require("express");
const {
	getCostumer,
	getAllCostumers,
	postCostumer,
	putCostumer,
	deleteCostumer,
} = require("../Handlers/costumerHandler");
const router = Router();

router.get("/:id", getCostumer);
router.get("/", getAllCostumers);
router.post("/", postCostumer);
router.put("/:id", putCostumer);
router.delete("/:id", deleteCostumer);

module.exports = router;
