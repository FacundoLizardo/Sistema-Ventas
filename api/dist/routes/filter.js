"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filterController_1 = __importDefault(require("../controllers/filterController"));
const router = (0, express_1.Router)();
router.get("/", filterController_1.default.getFilterProducts);
module.exports = router;
