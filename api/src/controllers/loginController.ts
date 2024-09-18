import { Request, Response } from "express";
import loginService from "../services/LoginService";
import { UserLogin } from "../models/user";

declare module "express-session" {
  interface SessionData {
    user?: {
      userId: string;
      email: string;
      companyId: string;
      branchId?: string;
      role: string;
      token: string;
    };
  }
}

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
      req.session.user = {
        userId: user.id,
        email: user.email,
        companyId: user.companyId,
        branchId: user.branchId,
        role: user.role,
        token,
      };

      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          res.status(500).json({ error: "Error en la autenticación." });
        } else {
          res.status(200).json({
            success: true,
            dataUser: req.session.user,
          });
        }
      });
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error en la autenticación." });
      }
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          res.status(500).json({ success: false, message: "Logout failed." });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Logout successful." });
        }
      });
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      res
        .status(500)
        .json({ success: false, message: "An unexpected error occurred." });
    }
  }
}

export default new LoginController();
