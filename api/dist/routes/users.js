"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
router.get("/", userController_1.default.getUser);
router.get("/:companyId", userController_1.default.getUsers);
router.post("/:companyId", userController_1.default.postUser);
router.put("/", userController_1.default.putUser);
router.delete("/:id", userController_1.default.deleteUser);
exports.default = router;
