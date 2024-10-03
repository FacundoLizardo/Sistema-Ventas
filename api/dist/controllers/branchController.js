"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const BranchServices_1 = __importDefault(require("../services/BranchServices"));
class BranchController {
    async getBranches(req, res) {
        try {
            const { companyId } = req.query;
            if (!companyId) {
                res.status(400).json({ message: "Company id is required" });
            }
            const branches = await BranchServices_1.default.getBranches({ companyId });
            if (!branches) {
                res.status(404).json({ message: "Branches not found" });
            }
            res.status(200).json({ success: true, branches });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 404);
        }
    }
    async postBranch(req, res) {
        try {
            const { companyId } = req.params;
            if (!companyId) {
                res.status(400).json({ message: "Company id is required" });
            }
            const newBranch = await BranchServices_1.default.postBranch(req.body, companyId);
            if (!newBranch) {
                res.status(404).json({ message: "Branch not found" });
            }
            res.status(200).json({ success: true, newBranch });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 400);
        }
    }
    async putBranch(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            if (!id)
                throw new Error("Branch ID is required.");
            const updatedBranch = await BranchServices_1.default.putBranch(id, data);
            res.status(200).json(updatedBranch);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 400);
        }
    }
    async deleteBranch(req, res) {
        const { id } = req.params;
        try {
            if (!id)
                throw new Error("Branch ID is required.");
            const deletedCount = await BranchServices_1.default.deleteBranch(id);
            if (deletedCount === 0)
                throw new Error("Branch not found.");
            res.status(204).send();
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 400);
        }
    }
}
exports.default = new BranchController();
