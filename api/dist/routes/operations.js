"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operationContoller_1 = __importDefault(require("../controllers/operationContoller"));
const router = (0, express_1.Router)();
router.get("/", operationContoller_1.default.getOperation);
router.post("/", operationContoller_1.default.postOperation);
router.put("/:id", operationContoller_1.default.putOperation);
router.delete("/:id", operationContoller_1.default.deleteOperation);
module.exports = router;
