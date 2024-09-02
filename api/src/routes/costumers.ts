import { Router } from "express";
import costumerController from "../controllers/costumerController";

const router = Router();

router.get("/:id", costumerController.getCostumer);
router.get("/", costumerController.getCostumers);
router.post("/", costumerController.postCostumer);
router.put("/:id", costumerController.putCostumer);
router.delete("/:id", costumerController.deleteCostumer);

module.exports = router;
