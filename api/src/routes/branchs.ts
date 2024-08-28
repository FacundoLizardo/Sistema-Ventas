import { Router, Request, Response, NextFunction } from "express";
import { deleteBranch, getBranch, getBranchs, postBranch, putBranch } from "../handlers/branchHandler";
import { BranchInterface } from "../models/branch";

const router = Router();

const branchVerify = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requiredFields: { field: keyof BranchInterface; name: string }[] = [
    { field: "ptoVta", name: "ptoVta" },
    { field: "name", name: "name" },
    { field: "location", name: "location" },
  ];
  for (const { field, name } of requiredFields) {
    if (!req.body[field]) {
      res.status(400).json({
        message: `Missing field: ${name}`,
      });
      return;
    }
  }
  next();
};

const verifyId = (req: Request, res: Response, next: NextFunction): void => {
  const verifica = req.params.id;
   if (typeof verifica !== "string" || verifica.length <= 3) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  next();
};

router.get("/:id", verifyId, getBranch);
router.get("/", getBranchs);
router.post("/", branchVerify, postBranch);
router.put("/:id", branchVerify, putBranch);
router.delete("/:id", verifyId, deleteBranch);

export default router;
