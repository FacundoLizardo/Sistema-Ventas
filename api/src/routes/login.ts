import { Router } from "express";
import loginController from "../controllers/loginController";

const loginRouter = Router();

loginRouter.post("/login", loginController.login);
loginRouter.post("/logout", loginController.logout);

export default loginRouter;
