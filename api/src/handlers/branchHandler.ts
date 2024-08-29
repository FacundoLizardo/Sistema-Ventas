/* import { Request, Response } from "express";
import { deleteBranchController } from "../controllers/branch/deleteBranchController";
import { handlerError } from "../utils/controllerError";
import { createError } from "../utils/createError";
import { getBranchByIdController } from "../controllers/branch/getBranchByIdController";
import { getAllBranchesController } from "../controllers/branch/getAllBranchesController";
import { postBranchController } from "../controllers/branch/postBranchController";
import { BranchInterface } from "../models/branch";
import { putBranchController } from "../controllers/branch/putBranchController";

export const getBranch = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) throw createError("No branch found.", 404);
    const branch = await getBranchByIdController(id);
    if (!branch) throw createError("No branch found.", 404);
    res.status(200).json({ success: true, branch });
  } catch (error: any) {
    handlerError(res, error, 400);
  }
};

export const getBranchs = async (_req: Request, res: Response) => {
  try {
    const branches = await getAllBranchesController();
    if (!branches) throw createError("No branches found.", 404);
    res.status(200).json({ success: true, branches });
  } catch (error: any) {
    handlerError(res, error, 400);
  }
};

export const postBranch = async (req: Request, res: Response) => {
  const { name, location } = req.body as BranchInterface;

  if (!name || !location) {
    res.status(404).json("Missing information.");
  }

  try {
    const newBranch = await postBranchController({ req });
    if (!newBranch) throw createError("No branch found.", 404);
    res.status(200).json(newBranch);
  } catch (error: any) {
    handlerError(res, error, 400);
  }
};

export const putBranch = async (req: Request, res: Response) => {
  try {
    const branchId = req.params.id;

    if (!branchId) throw createError("No branch found.", 404);

    const updatedBranch = await putBranchController({ req });
    res.status(200).json(updatedBranch);
  } catch (error: any) {
    handlerError(res, error, 400);
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const branchId = req.params.id;

    if (!branchId) {
      throw createError("Branch not deleted because it does not exist", 400);
    }

    const deletedBranch = await deleteBranchController(branchId);

    res.status(200).json(deletedBranch);
  } catch (error) {
    handlerError(res, error, 400);
  }
};
 */