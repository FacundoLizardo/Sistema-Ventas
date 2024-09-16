import { Router } from "express";
import companyController from "../controllers/companyController";

const router = Router();

router.get("/:id", companyController.getCompany);
router.get("/", companyController.getCompanies);
router.post("/", companyController.postCompany);
router.put("/:id", companyController.putCompany);
router.delete("/:id", companyController.deleteCompany);

export default router;
