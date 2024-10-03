"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
const loginRouter = (0, express_1.Router)();
loginRouter.post("/login", loginController_1.default.login);
loginRouter.post("/logout", loginController_1.default.logout);
exports.default = loginRouter;
