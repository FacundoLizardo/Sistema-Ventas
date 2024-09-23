import { Router } from "express";
import stockController from "../controllers/stockController";

const router = Router();

router.get("/", stockController.getStock);
router.get("/:companyId", stockController.getStocks);
router.post("/:companyId", stockController.postStock);
router.put("/", () => {});
router.delete("/", () => {});

export default router;
