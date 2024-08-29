/*  import { User } from "../../db";
import { controllerError } from "../../utils/servicesError";

export const getUserByIdController = async (id: string) => {
	try {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error(`User with ID ${id} not found`);
		}
		return user;
	} catch (error) {
		controllerError(error);
	  }
};

  */