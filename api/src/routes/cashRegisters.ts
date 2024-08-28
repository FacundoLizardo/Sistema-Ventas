import { Router } from "express";
import {
  getCashRegister,
  getAllCashRegisters,
  postCashRegister,
  putCashRegister,
  deleteCashRegister,
} from "../handlers/cashRegisterHandler";

const router = Router();

router.get("/:id", getCashRegister);
router.get("/", getAllCashRegisters);
router.post("/", postCashRegister);
router.put("/:id", putCashRegister);
router.delete("/:id", deleteCashRegister);

export default router;
