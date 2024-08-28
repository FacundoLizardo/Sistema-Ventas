import { CashRegister } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const getAllCashRegistersController = async () => {
  try {
    const cashRegisters = await CashRegister.findAll();
    return cashRegisters || [];
  } catch (error) {
    controllerError(error);
  }
};
