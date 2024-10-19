"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = __importDefault(require("../controllers/stockController"));
const router = (0, express_1.Router)();
router.get("/", stockController_1.default.getStock);
router.get("/:companyId", stockController_1.default.getStocks);
router.post("/:companyId", stockController_1.default.postStock);
router.put("/", () => { });
router.delete("/", () => { });
exports.default = router;
