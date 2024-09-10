import { Router } from "express";
import operationController from "../controllers/operationContoller";

const router = Router();

router.get("/:id", operationController.getOperation);
router.get("/", operationController.getOperations);
router.post("/", operationController.postOperation);
router.put("/:id", operationController.putOperation);
router.delete("/:id", operationController.deleteOperation);

module.exports = router;
