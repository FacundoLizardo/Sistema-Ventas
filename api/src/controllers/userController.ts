import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import UserServices from "../services/UserServices";

class UserController {
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserServices.getUser(id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await UserServices.getUsers();

      if (!users.length) {
        res.status(404).json({ message: "No users found" });
        return;
      }

      res.status(200).json({ success: true, users });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postUser(req: Request, res: Response): Promise<void> {
    try {
      const companyId = req.params.companyId;
      const newUser = await UserServices.postUser(req.body, companyId);

      if (typeof newUser === "string") {
        res.status(400).json({ message: newUser });
        return;
      }

      res.status(201).json(newUser);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async putUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateResult = await UserServices.putUser(id, req.body);

      if (updateResult === true) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: updateResult });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteResult = await UserServices.deleteUser(id);

      if (deleteResult === true) {
        res.status(204).json({ success: true });
      } else {
        res.status(404).json({ message: deleteResult });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new UserController();
