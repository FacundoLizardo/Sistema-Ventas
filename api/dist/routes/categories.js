"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const router = (0, express_1.Router)();
router.get("/", categoryController_1.default.getCategories);
router.post("/:companyId", categoryController_1.default.postCategory);
router.delete("/", categoryController_1.default.deleteCategory);
exports.default = router;
