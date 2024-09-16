 import { Router } from "express";
import AfipController from "../controllers/afipController";

const router = Router();

router.post("/:companyId", AfipController.postAfip);

module.exports = router;
 