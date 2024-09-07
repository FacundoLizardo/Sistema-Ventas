import { controllerError } from "../utils/controllerError";
import { Request, Response } from "express";
import OperationServices from "../services/OperationServices";

class OperationController {
  async getOperation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(404).json({ message: "Operation id is required" });
      }

      const operation = await OperationServices.getOperation(id);

      if (!operation) {
        res.status(404).json({ message: "Operation not found" });
      }

      res.status(200).json({ success: true, operation });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getOperations(_req: Request, res: Response) {
    try {
      const operations = await OperationServices.getOperations();

      if (!operations) {
        res.status(404).json({ message: "Operations not found" });
        return;
      }

      res.status(200).json({ success: true, operations });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postOperation(req: Request, res: Response) {
    try {
      const companyId = req.params.companyId;

      if (!companyId) {
        res.status(404).json({
          message:
            "The operation could not be created, companyId not found. Please try again.",
        });
      }

      const newOperation = await OperationServices.postOperation(
        req.body,
        companyId
      );

      if (!newOperation) {
        res.status(404).json({
          message: "The operation could not be created. Please try again.",
        });
      }

      res.status(201).json(newOperation);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async putOperation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(404).json({ message: "Operation id is required" });
      }

      const updateOperation = await OperationServices.putOperation(
        id,
        req.body
      );

      if (updateOperation !== true) {
        res.status(400).json({ message: "Operation not updated." });
      } else {
        res.status(204).json({ success: true });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async deleteOperation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(404).json({ message: "Operation id is required" });
      }

      const deletedOperation = await OperationServices.deleteOperation(id);

      if (deletedOperation !== true) {
        res.status(400).json({ message: "Operation not deleted." });
      } else {
        res.status(204).json({ success: true });
      }
      
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new OperationController();
