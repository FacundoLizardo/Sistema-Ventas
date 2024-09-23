import { Router } from "express";
import branchController from "../controllers/branchController";

const router = Router();

router.get("/", branchController.getBranches);
router.post("/:companyId", branchController.postBranch);
router.put("/:id", branchController.putBranch);
router.delete("/:id", branchController.deleteBranch);

export default router;
