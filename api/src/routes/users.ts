import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getUser);
router.get("/:id",userController.getUsers);
router.post("/:companyId", userController.postUser);
router.put("/:id", userController.putUser);
router.delete("/:id", userController.deleteUser);

export default router;
