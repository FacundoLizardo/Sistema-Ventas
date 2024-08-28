import { CashRegister } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const deleteCashRegisterController = async (cashId: string) => {
  try {
    const deleteBranch = await CashRegister.destroy({
      where: { cashId: cashId },
    });
    return deleteBranch;
  } catch (error) {
    controllerError(error);
  }
};
