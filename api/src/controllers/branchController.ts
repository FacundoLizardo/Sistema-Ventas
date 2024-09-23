import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import BranchServices from "../services/BranchServices";
import { BranchInterface } from "../models/branch";

class BranchController {
  async getBranches(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.query as { companyId: string };

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const branches = await BranchServices.getBranches({ companyId });

      if (!branches) {
        res.status(404).json({ message: "Branches not found" });
      }

      res.status(200).json({ success: true, branches });
    } catch (error) {
      controllerError(res, error, 404);
    }
  }

  async postBranch(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const newBranch = await BranchServices.postBranch(req.body, companyId);

      if (!newBranch) {
        res.status(404).json({ message: "Branch not found" });
      }

      res.status(200).json({ success: true, newBranch });
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
