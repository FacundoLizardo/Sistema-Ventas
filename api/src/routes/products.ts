import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

router.get("/", productController.getProducts);
router.post("/:companyId", productController.postProduct);
router.put("/:id", productController.putProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
