import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

router.get("/:id", productController.getProduct);
router.get("/", productController.getProducts);
router.get("/categories", productController.getCategories);
router.post("/", productController.postProduct);
router.put("/:id", productController.putProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
