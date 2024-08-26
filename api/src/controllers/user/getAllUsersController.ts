import { User } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const getAllUsersController = async () => {
	try {
		const Users = await User.findAll();
		return Users || [];
	} catch (error) {
		controllerError(error);
	}
};
