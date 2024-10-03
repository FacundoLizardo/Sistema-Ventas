"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const BranchServices_1 = __importDefault(require("../services/BranchServices"));
class BranchController {
    getBranches(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.query;
                if (!companyId) {
                    res.status(400).json({ message: "Company id is required" });
                }
                const branches = yield BranchServices_1.default.getBranches({ companyId });
                if (!branches) {
                    res.status(404).json({ message: "Branches not found" });
                }
                res.status(200).json({ success: true, branches });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 404);
            }
        });
    }
    postBranch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.params;
                if (!companyId) {
                    res.status(400).json({ message: "Company id is required" });
                }
                const newBranch = yield BranchServices_1.default.postBranch(req.body, companyId);
                if (!newBranch) {
                    res.status(404).json({ message: "Branch not found" });
                }
                res.status(200).json({ success: true, newBranch });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 400);
            }
        });
    }
    putBranch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            try {
                if (!id)
                    throw new Error("Branch ID is required.");
                const updatedBranch = yield BranchServices_1.default.putBranch(id, data);
                res.status(200).json(updatedBranch);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 400);
            }
        });
    }
    deleteBranch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id)
                    throw new Error("Branch ID is required.");
                const deletedCount = yield BranchServices_1.default.deleteBranch(id);
                if (deletedCount === 0)
                    throw new Error("Branch not found.");
                res.status(204).send();
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 400);
            }
        });
    }
}
exports.default = new BranchController();
