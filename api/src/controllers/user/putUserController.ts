import { User } from "../../db";
import { Request } from "express";
import { controllerError } from "../../utils/controllerError";

export const putUserController = async ( {
  cuit, req,
}: {
  cuit: string;
  req: Request;
}) => {
	
  try {
    const existingUser = await User.findOne({
      where: { cuit: cuit },
    });

    if (!existingUser) {
      throw new Error(`The user whit the cuit: ${cuit} does not exist`);
    }

    const {
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      branch,
      enabled,
      role,
    } = req.body;

    await User.update(
      {
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        branch,
        enabled,
        role,
      },
      {
        where: { cuit: cuit },
      }
    );

    return true;
  } catch (error) {
    controllerError(error);
  }
};
