 import { Router } from "express";
import AfipController from "../controllers/afipController";

const router = Router();

router.post("/", AfipController.postAfip);

module.exports = router;
 