import { Router } from "express";
import stockController from "../controllers/stockController";

const router = Router();

router.get("/:companyId", stockController.getStocks);
router.post("/", stockController.postStock);
router.put("/", () => {});
router.delete("/", () => {});

export default router;
