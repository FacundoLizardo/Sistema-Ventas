/* import { Request, Response } from "express";
import { handlerError } from "../utils/controllerError";
import { deleteCashRegisterController } from "../controllers/cashRegister/deleteCashRegisterController";
import { getAllCashRegistersController } from "../controllers/cashRegister/getAllCashRegistersController";
import { getCashRegisterByIdController } from "../controllers/cashRegister/getCashRegisterByIdController";
import { postCashRegisterController } from "../controllers/cashRegister/postCashRegisterController";
import { putCashRegisterController } from "../controllers/cashRegister/putCashRegisterController";
import { createError } from "../utils/createError";

export const getCashRegister = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id)
      res
        .status(404)
        .json({ success: false, message: "No cash register found." });
    const cashRegister = await getCashRegisterByIdController(id);
    if (!cashRegister) createError("No cash register found.", 404);
    res.status(200).json({ success: true, cashRegister });
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const getAllCashRegisters = async (_req: Request, res: Response) => {
  try {
    const cashRegisters = await getAllCashRegistersController();
    if (!cashRegisters) createError("No cash registers found.", 404);
    res.status(200).json({ success: true, cashRegisters });
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const postCashRegister = async (req: Request, res: Response) => {
  try {
    const newCashRegister = await postCashRegisterController({ req });

    res.status(200).json(newCashRegister);
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const putCashRegister = async (req: Request, res: Response) => {
  try {
    const cashId = req.params.id;

    if (!cashId) throw createError("No cash register found.", 404);

    const updatedCashRegister = await putCashRegisterController({ req });
    if (!updatedCashRegister) throw createError("No cash register found.", 404);
    res.status(200).json(updatedCashRegister);
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const deleteCashRegister = async (req: Request, res: Response) => {
  try {
    const cashId = req.params.id;
    if (!cashId) throw createError("No cash register found.", 404);

    const deletedCashRegister = await deleteCashRegisterController(cashId);
    if (!deletedCashRegister) throw createError("No cash register found.", 404);
    res.status(200).json(deletedCashRegister);
  } catch (error) {
    handlerError(res, error, 400);
  }
};
 */