import { Request, Response } from "express";
import { getBranchByIdController } from "../controllers/branch/getBranchByIdController";
import { postBranchController } from "../controllers/branch/postBranchController";
import { getAllBranchesController } from "../controllers/branch/getAllBranchesController";
import { putBranchController } from "../controllers/branch/putBranchController";
import { deleteBranchController } from "../controllers/branch/deleteBranchController";

export const getBranch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const branch = await getBranchByIdController(id);
    if (branch && typeof branch === "object") {
      return res.status(200).json(branch);
    } else {
      return res.status(401).send(branch);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const postBranch = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const branch = await postBranchController(req, res);
    if (branch && typeof branch === "object") {
      return res.status(200).json(branch);
    } else {
      return res.status(401).send(branch);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBranchs = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const branches = await getAllBranchesController();

    if (branches.length > 0) {
      return res.status(200).json(branches);
    } else {
      return res.status(404).send("No branches found.");
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const putBranch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedBranch = await putBranchController(req, res);
    if (updatedBranch && typeof updatedBranch === "object") {
      return res.status(200).json(updatedBranch);
    } else {
      return res.status(401).send(updatedBranch);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBranch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const deletedBranch = await deleteBranchController(id);
    if (deletedBranch && typeof deletedBranch === "number") {
      return res.status(200).json(deletedBranch);
    } else {
      return res.status(401).send(deletedBranch);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

