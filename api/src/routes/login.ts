import { Router } from "express";
import { loginHandler } from "../handlers/loginHandler";

const router = Router();

router.get("/", loginHandler);

export default router;
