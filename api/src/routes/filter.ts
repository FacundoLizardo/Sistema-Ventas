import { Router } from "express";
import filterController from "../controllers/filterController";

const router = Router();

router.get("/", filterController.getFilterProducts);

module.exports = router;
