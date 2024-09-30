import { Router } from "express";
import categoryController from "../controllers/categoryController";

const router = Router();

router.get("/", categoryController.getCategories);
router.post("/:companyId", categoryController.postCategory);
router.delete("/", categoryController.deleteCategory);

export default router;
