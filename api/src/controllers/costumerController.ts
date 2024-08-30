import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import CostumerService from "../services/CostumerServices";

class CostumerController {
  async getCostumer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const costumer = await CostumerService.getCostumer(id);

      if (!costumer) {
        res.status(404).json({ message: "Costumer not found" });
        return;
      }

      res.status(200).json({ success: true, costumer });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getCostumers(_req: Request, res: Response): Promise<void> {
    try {
      const costumers = await CostumerService.getCostumers();

      if (!costumers.length) {
        res.status(404).json({ message: "No costumers found" });
        return;
      }

      res.status(200).json({ success: true, costumers });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postCostumer(req: Request, res: Response): Promise<void> {
    try {
      const newCostumer = await CostumerService.postCostumer(req.body);

      if (typeof newCostumer === "string") {
        res.status(400).json({ message: newCostumer });
        return;
      }

      res.status(201).json(newCostumer);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async putCostumer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateResult = await CostumerService.putCostumer(id, req.body);

      if (updateResult === true) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: updateResult });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async deleteCostumer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteResult = await CostumerService.deleteCostumer(id);

      if (deleteResult === true) {
        res.status(204).json({ success: true });
      } else {
        res.status(404).json({ message: deleteResult });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new CostumerController();
