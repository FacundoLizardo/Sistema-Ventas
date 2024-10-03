"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const afipController_1 = __importDefault(require("../controllers/afipController"));
const router = (0, express_1.Router)();
router.post("/:companyId", afipController_1.default.postAfip);
module.exports = router;
