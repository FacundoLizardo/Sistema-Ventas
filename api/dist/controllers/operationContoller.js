"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const OperationServices_1 = __importDefault(require("../services/OperationServices"));
class OperationController {
    async getOperation(req, res) {
        try {
            const { companyId, startDate, endDate, userId } = req.query;
            if (!companyId) {
                return res.status(404).json({ message: "CompanyId is required" });
            }
            const operations = await OperationServices_1.default.getOperations({
                startDate,
                endDate,
                companyId,
                userId,
            });
            if (!operations || operations.length === 0) {
                return res.status(404).json({ message: "Operation not found" });
            }
            return res.status(200).json({ success: true, operations });
        }
        catch (error) {
            return (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async postOperation(req, res) {
        try {
            const companyId = req.params.companyId;
            if (!companyId) {
                res.status(404).json({
                    message: "The operation could not be created, companyId not found. Please try again.",
                });
            }
            const newOperation = await OperationServices_1.default.postOperation(req.body, companyId);
            if (!newOperation) {
                res.status(404).json({
                    message: "The operation could not be created. Please try again.",
                });
            }
            res.status(201).json(newOperation);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async putOperation(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(404).json({ message: "Operation id is required" });
            }
            const updateOperation = await OperationServices_1.default.putOperation(id, req.body);
            if (updateOperation !== true) {
                res.status(400).json({ message: "Operation not updated." });
            }
            else {
                res.status(204).json({ success: true });
            }
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async deleteOperation(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(404).json({ message: "Operation id is required" });
            }
            const deletedOperation = await OperationServices_1.default.deleteOperation(id);
            if (deletedOperation !== true) {
                res.status(400).json({ message: "Operation not deleted." });
            }
            else {
                res.status(204).json({ success: true });
            }
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
}
exports.default = new OperationController();
