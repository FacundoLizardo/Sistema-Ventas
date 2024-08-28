import { Request } from "express";
import { controllerError } from "../../utils/controllerError";

import { User } from "../../db";
import bcrypt from "bcrypt";

export const loginController = async ({ req }: { req: Request }) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error(`User whit the email: ${email} not found.`);
    }

    const validPassword = await bcrypt.compare(password, password);
	
    if (!validPassword) {
      throw new Error("Invalid password.");
    }

    if (user && validPassword) {
      return true;
    }

	return false;
  } catch (error) {
    controllerError(error);
  }
};
