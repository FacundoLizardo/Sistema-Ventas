import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import CashRegisterServices from "../services/CashRegisterServices";

class CashRegisterController {
  async getCashRegister(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cashRegister = await CashRegisterServices.getCashRegister(id);

      if (!cashRegister) {
        res.status(404).json({ message: "No cash register found." });
        return;
      }

      res.status(200).json({ success: true, cashRegister });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getAllCashRegisters(_req: Request, res: Response): Promise<void> {
    try {
      const cashRegisters = await CashRegisterServices.getCashRegisters();

      if (!cashRegisters.length) {
        res.status(404).json({ message: "No cash registers found." });
        return;
      }

      res.status(200).json({ success: true, cashRegisters });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postCashRegister(req: Request, res: Response): Promise<void> {
    try {
      const newCashRegister = await CashRegisterServices.postCashRegister(
        req.body
      );

      if (typeof newCashRegister === "string") {
        res.status(400).json({ message: newCashRegister });
        return;
      }

      res.status(201).json(newCashRegister);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async putCashRegister(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedCashRegister = await CashRegisterServices.putCashRegister(
        id,
        req.body
      );

      if (!updatedCashRegister) {
        res.status(400).json({ message: "Cash register not updated." });
        return;
      }

      res.status(200).json(updatedCashRegister);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async deleteCashRegister(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCashRegister = await CashRegisterServices.deleteCashRegister(
        id
      );

      if (!deletedCashRegister) {
        res.status(400).json({ message: "Cash register not deleted." });
        return;
      }

      res.status(200).json(deletedCashRegister);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new CashRegisterController();
