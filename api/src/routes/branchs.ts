import { Router } from "express";
import {
  getBranch,
  getBranchs,
  postBranch,
  putBranch,
  deleteBranch,
} from "../handlers/branchHandler";

const router = Router();

router.get("/:id", getBranch);
router.get("/", getBranchs);
router.post("/", postBranch);
router.put("/:id", putBranch);
router.delete("/:id", deleteBranch);

export default router;
