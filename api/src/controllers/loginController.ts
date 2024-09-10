import { Request, Response } from "express";
import loginService from "../services/LoginService";
import { UserLogin } from "../models/user";
import { controllerError } from "../utils/controllerError";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      companyId: string;
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
        throw new Error(`User with the email: ${email} not found.`);
      }

      const token = loginService.generateToken(user);

      req.session.user = {
        id: user.id,
        email: user.email,
        companyId: user.companyId,
        token,
      };

      req.session.save((err) => {
        if (err) {
          throw err;
        }

        res.status(200).json({
          success: true,
          dataUser: req.session.user,
        });
      });
    } catch (error) {
      controllerError(res, error, 500);
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
