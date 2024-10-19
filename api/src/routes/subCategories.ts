import { Router } from "express";
import subCategoryController from "../controllers/subCategoryController";

const router = Router();

router.get("/", subCategoryController.getSubCategories);
router.post("/:companyId", subCategoryController.postSubCategory);
router.delete("/", subCategoryController.deleteSubCategory);

export default router;
