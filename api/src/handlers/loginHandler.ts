/* import { Request, Response } from "express";
import { loginController } from "../controllers/login/loginController";
import { handlerError } from "../utils/controllerError";
import { createError } from "../utils/createError";

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const user = await loginController({ req });
    if (!user) createError("User not found", 404);
    res.status(200).json({ success: true, user });
  } catch (error) {
    handlerError(res, error, 400);
  }
};
 */