"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyController_1 = __importDefault(require("../controllers/companyController"));
const router = (0, express_1.Router)();
router.get("/:id", companyController_1.default.getCompany);
router.get("/", companyController_1.default.getCompanies);
router.post("/", companyController_1.default.postCompany);
router.put("/:id", companyController_1.default.putCompany);
router.delete("/:id", companyController_1.default.deleteCompany);
exports.default = router;
