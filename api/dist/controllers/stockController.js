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
const StockServices_1 = __importDefault(require("../services/StockServices"));
class StockController {
    getStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, branchId } = req.query;
                if (!id) {
                    res.status(404).json({ message: "Stock id is required" });
                }
                const stock = yield StockServices_1.default.getStock({ id, branchId });
                if (!stock) {
                    res.status(404).json({ message: "Stock not found" });
                    return;
                }
                res.status(200).json({ success: true, stock });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    getStocks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.params;
                const stocks = yield StockServices_1.default.getStocks(companyId);
                if (!stocks.length) {
                    res.status(404).json({ message: "No stocks found" });
                    return;
                }
                res.status(200).json({ success: true, stocks });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    postStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyId = req.params.companyId;
                if (!companyId) {
                    res.status(404).json({ message: "Company id is required" });
                }
                const newStock = yield StockServices_1.default.postStock(req.body, companyId);
                if (!newStock) {
                    res.status(400).json({ message: newStock });
                    return;
                }
                res.status(201).json(newStock);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
}
exports.default = new StockController();
