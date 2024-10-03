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
const CashRegisterServices_1 = __importDefault(require("../services/CashRegisterServices"));
class CashRegisterController {
    getCashRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cashRegister = yield CashRegisterServices_1.default.getCashRegister(id);
                if (!cashRegister) {
                    res.status(404).json({ message: "No cash register found." });
                    return;
                }
                res.status(200).json({ success: true, cashRegister });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    getAllCashRegisters(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashRegisters = yield CashRegisterServices_1.default.getCashRegisters();
                if (!cashRegisters.length) {
                    res.status(404).json({ message: "No cash registers found." });
                    return;
                }
                res.status(200).json({ success: true, cashRegisters });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    postCashRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCashRegister = yield CashRegisterServices_1.default.postCashRegister(req.body);
                if (typeof newCashRegister === "string") {
                    res.status(400).json({ message: newCashRegister });
                    return;
                }
                res.status(201).json(newCashRegister);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    putCashRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedCashRegister = yield CashRegisterServices_1.default.putCashRegister(id, req.body);
                if (!updatedCashRegister) {
                    res.status(400).json({ message: "Cash register not updated." });
                    return;
                }
                res.status(200).json(updatedCashRegister);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    deleteCashRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedCashRegister = yield CashRegisterServices_1.default.deleteCashRegister(id);
                if (!deletedCashRegister) {
                    res.status(400).json({ message: "Cash register not deleted." });
                    return;
                }
                res.status(200).json(deletedCashRegister);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
}
exports.default = new CashRegisterController();
