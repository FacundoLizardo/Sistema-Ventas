import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import loginService from "../services/LoginService";
import { UserLogin } from "../models/user";
class LoginController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = (await loginService.authenticate(
        email,
        password
      )) as UserLogin;
      const token = loginService.generateToken(user);

      const dataUser = {
        id: user.id,
        email: user.email,
        companyId: user.companyId,
      };

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });

      res.status(200).json({ success: true, token, dataUser });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new LoginController();
