/* import { User } from "../../db";
import { controllerError } from "../../utils/servicesError";

export const getAllUsersController = async () => {
	try {
		const Users = await User.findAll();
		return Users || [];
	} catch (error) {
		controllerError(error);
	}
};
 */