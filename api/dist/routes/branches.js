"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branchController_1 = __importDefault(require("../controllers/branchController"));
const router = (0, express_1.Router)();
router.get("/", branchController_1.default.getBranches);
router.post("/:companyId", branchController_1.default.postBranch);
router.put("/:id", branchController_1.default.putBranch);
router.delete("/:id", branchController_1.default.deleteBranch);
exports.default = router;
