import { User } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const deleteUserController = async (cuit: string) => {
  try {
    const deletedUserCount = await User.update(
      {
        enabled: false,
      },
      {
        where: { cuit: cuit },
      }
    );

console.log({deleteUserController});

    if (!deletedUserCount) {
      throw new Error(`User with CUIT "${cuit}" does not exist.`);
    }

    return true;
  } catch (error) {
    controllerError(error);
  }
};