import { Router } from "express";
import categoryController from "../controllers/categoryController";

const router = Router();

router.get("/", categoryController.getCategories);
router.post("/:companyId", categoryController.postCategory);
router.put("/:id", );
router.delete("/:id", );

export default router;
