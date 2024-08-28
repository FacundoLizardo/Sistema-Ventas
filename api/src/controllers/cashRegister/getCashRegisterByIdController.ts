import { CashRegister } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const getCashRegisterByIdController = async (id: string) => {
	try {
		const cashRegister = await CashRegister.findByPk(id);
		return cashRegister || [];
	} catch (error) {
		controllerError(error);
	}
};