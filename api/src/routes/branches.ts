import { Router } from "express";
import branchController from "../controllers/branchController";

const router = Router();

router.get("/:id", branchController.getBranch);
router.get("/", branchController.getBranches);
router.post("/", branchController.postBranch);
router.put("/:id", branchController.putBranch);
router.delete("/:id", branchController.deleteBranch);

export default router;
