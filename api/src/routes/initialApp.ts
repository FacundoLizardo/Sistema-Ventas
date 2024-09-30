import { Router } from "express";
import userController from "../controllers/userController";
import companyController from "../controllers/companyController";

const initialRouter = Router();

initialRouter.post("/company/", companyController.postCompany);
initialRouter.post("/user/:companyId", userController.postUser);

export default initialRouter;
