import { Router } from "express";
import {
  deleteProduct,
  getCategories,
  getProduct,
  getProducts,
  postProducts,
  putProduct,
} from "../handlers/productsHandler";

const router = Router();

router.get("/:id", getProduct);
router.get("/", getProducts);
router.get("/categories", getCategories);
router.post("/", postProducts);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

export default router;
