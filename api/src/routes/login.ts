import { Router } from "express";
import loginController from "../controllers/loginController";

const loginRouter = Router();

loginRouter.post("/", loginController.login);

export default loginRouter;
