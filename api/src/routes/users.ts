import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getUser);
router.get("/:companyId",userController.getUsers);
router.post("/:companyId", userController.postUser);
router.put("/", userController.putUser);
router.delete("/:id", userController.deleteUser);

export default router;
