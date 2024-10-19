"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controllers/productController"));
const router = (0, express_1.Router)();
router.get("/", productController_1.default.getProducts);
router.post("/:companyId", productController_1.default.postProduct);
router.put("/:id", productController_1.default.putProduct);
router.delete("/:id", productController_1.default.deleteProduct);
exports.default = router;
