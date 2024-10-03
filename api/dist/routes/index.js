"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const mainRouter = (0, express_1.Router)();
const PATH_ROUTER = __dirname;
(0, fs_1.readdirSync)(PATH_ROUTER).filter((fileName) => {
    const cleanRouter = path_1.default.parse(fileName).name;
    if (cleanRouter !== "index" && cleanRouter !== "login") {
        const moduleRouter = require(`./${cleanRouter}`).default || require(`./${cleanRouter}`);
        // console.log(`The route is being loaded: /${cleanRouter}`);
        mainRouter.use(`/${cleanRouter}`, moduleRouter);
    }
});
exports.default = mainRouter;
