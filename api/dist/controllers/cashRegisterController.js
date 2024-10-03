"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const CashRegisterServices_1 = __importDefault(require("../services/CashRegisterServices"));
class CashRegisterController {
    async getCashRegister(req, res) {
        try {
            const { id } = req.params;
            const cashRegister = await CashRegisterServices_1.default.getCashRegister(id);
            if (!cashRegister) {
                res.status(404).json({ message: "No cash register found." });
                return;
            }
            res.status(200).json({ success: true, cashRegister });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async getAllCashRegisters(_req, res) {
        try {
            const cashRegisters = await CashRegisterServices_1.default.getCashRegisters();
            if (!cashRegisters.length) {
                res.status(404).json({ message: "No cash registers found." });
                return;
            }
            res.status(200).json({ success: true, cashRegisters });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async postCashRegister(req, res) {
        try {
            const newCashRegister = await CashRegisterServices_1.default.postCashRegister(req.body);
            if (typeof newCashRegister === "string") {
                res.status(400).json({ message: newCashRegister });
                return;
            }
            res.status(201).json(newCashRegister);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async putCashRegister(req, res) {
        try {
            const { id } = req.params;
            const updatedCashRegister = await CashRegisterServices_1.default.putCashRegister(id, req.body);
            if (!updatedCashRegister) {
                res.status(400).json({ message: "Cash register not updated." });
                return;
            }
            res.status(200).json(updatedCashRegister);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async deleteCashRegister(req, res) {
        try {
            const { id } = req.params;
            const deletedCashRegister = await CashRegisterServices_1.default.deleteCashRegister(id);
            if (!deletedCashRegister) {
                res.status(400).json({ message: "Cash register not deleted." });
                return;
            }
            res.status(200).json(deletedCashRegister);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
}
exports.default = new CashRegisterController();
