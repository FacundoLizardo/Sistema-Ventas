import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import StockServices from "../services/StockServices";

class StockController {
  async getStock(req: Request, res: Response): Promise<void> {
    try {
      const { id, branchId } = req.query as { id: string; branchId: string };

      if (!id) {
        res.status(404).json({ message: "Stock id is required" });
      }

      const stock = await StockServices.getStock({ id, branchId });

      if (!stock) {
        res.status(404).json({ message: "Stock not found" });
        return;
      }

      res.status(200).json({ success: true, stock });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getStocks(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;

      const stocks = await StockServices.getStocks(companyId);

      if (!stocks.length) {
        res.status(404).json({ message: "No stocks found" });
        return;
      }

      res.status(200).json({ success: true, stocks });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postStock(req: Request, res: Response): Promise<void> {
    try {
      const companyId = req.params.companyId;

      if (!companyId) {
        res.status(404).json({ message: "Company id is required" });
      }

      const newStock = await StockServices.postStock(req.body, companyId);

      if (!newStock) {
        res.status(400).json({ message: newStock });
        return;
      }

      res.status(201).json(newStock);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  /* async putUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.query as { userId: string };

      if (!userId) {
        res.status(400).json({ message: "User id is required" });
      }

      const updateResult = await UserServices.putUser(userId, req.body);

      if (updateResult === true) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: updateResult });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  } */

  /* async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "User id is required" });
      }

      const deleteUser = await UserServices.deleteUser(id);

      if (deleteUser !== true) {
        res.status(400).json({ message: "User not deleted." });
      } else {
        res.status(204).json({ success: true });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  } */
}

export default new StockController();
