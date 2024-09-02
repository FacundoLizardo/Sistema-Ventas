import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import loginService from "../services/LoginService";
class LoginController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await loginService.authenticate(email, password);
      const token = loginService.generateToken(user);
      console.log("Generated Token:", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new LoginController();
