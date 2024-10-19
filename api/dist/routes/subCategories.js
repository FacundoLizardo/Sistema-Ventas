"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subCategoryController_1 = __importDefault(require("../controllers/subCategoryController"));
const router = (0, express_1.Router)();
router.get("/", subCategoryController_1.default.getSubCategories);
router.post("/:companyId", subCategoryController_1.default.postSubCategory);
router.delete("/", subCategoryController_1.default.deleteSubCategory);
exports.default = router;
