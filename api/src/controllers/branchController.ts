import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import BranchServices from "../services/BranchServices";
import { BranchInterface } from "../models/branch";

class BranchController {
  async getBranch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (!id) throw new Error("Branch ID is required.");
      const branch = await BranchServices.getBranchById(id);
      if (!branch) throw new Error("Branch not found.");
      res.status(200).json({ success: true, branch });
    } catch (error) {
      controllerError(res, error, 404);
    }
  }

  async getBranches(_req: Request, res: Response): Promise<void> {
    try {
      const branches = await BranchServices.getAllBranches();
      if (branches.length === 0) throw new Error("No branches found.");
      res.status(200).json({ success: true, branches });
    } catch (error) {
      controllerError(res, error, 404);
    }
  }

  async postBranch(req: Request, res: Response): Promise<void> {
    const data = req.body as BranchInterface;
    try {
      if (!data.name || !data.location) {
        res.status(400).json({ message: "Missing information." });
        return;
      }
      const newBranch = await BranchServices.postBranch(data);
      if (typeof newBranch === "string") {
        res.status(400).json({ message: newBranch });
        return;
      }
      res.status(201).json(newBranch);
    } catch (error) {
      controllerError(res, error, 400);
    }
  }

  async putBranch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = req.body as BranchInterface;
    try {
      if (!id) throw new Error("Branch ID is required.");
      const updatedBranch = await BranchServices.putBranch(id, data);
      res.status(200).json(updatedBranch);
    } catch (error) {
      controllerError(res, error, 400);
    }
  }

  async deleteBranch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (!id) throw new Error("Branch ID is required.");
      const deletedCount = await BranchServices.deleteBranch(id);
      if (deletedCount === 0) throw new Error("Branch not found.");
      res.status(204).send();
    } catch (error) {
      controllerError(res, error, 400);
    }
  }
}

export default new BranchController();
