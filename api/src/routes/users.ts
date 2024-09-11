import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/:userId", userController.getUser);
router.get("/",userController.getUsers);
router.post("/:companyId", userController.postUser);
router.put("/:id", userController.putUser);
router.delete("/:id", userController.deleteUser);

export default router;
