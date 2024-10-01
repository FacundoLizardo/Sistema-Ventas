import { Request, Response } from "express";
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

      if (!user) {
        res
          .status(401)
          .json({ success: false, message: "Email o contraseña incorrectos." });
        return;
      }

      const token = loginService.generateToken(user);

      res.status(200).json({
        success: true,
        dataUser: {
          userId: user.id,
          email: user.email,
          companyId: user.companyId,
          branchId: user.branchId,
          role: user.role,
          token,
        },
      });
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error en la autenticación." });
      }
    }
  }

  async logout(_req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("token");
      res.status(200).json({ success: true, message: "Logout successful." });
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      res
        .status(500)
        .json({ success: false, message: "An unexpected error occurred." });
    }
  }
}

export default new LoginController();
