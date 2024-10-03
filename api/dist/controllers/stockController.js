"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const StockServices_1 = __importDefault(require("../services/StockServices"));
class StockController {
    async getStock(req, res) {
        try {
            const { id, branchId } = req.query;
            if (!id) {
                res.status(404).json({ message: "Stock id is required" });
            }
            const stock = await StockServices_1.default.getStock({ id, branchId });
            if (!stock) {
                res.status(404).json({ message: "Stock not found" });
                return;
            }
            res.status(200).json({ success: true, stock });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async getStocks(req, res) {
        try {
            const { companyId } = req.params;
            const stocks = await StockServices_1.default.getStocks(companyId);
            if (!stocks.length) {
                res.status(404).json({ message: "No stocks found" });
                return;
            }
            res.status(200).json({ success: true, stocks });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async postStock(req, res) {
        try {
            const companyId = req.params.companyId;
            if (!companyId) {
                res.status(404).json({ message: "Company id is required" });
            }
            const newStock = await StockServices_1.default.postStock(req.body, companyId);
            if (!newStock) {
                res.status(400).json({ message: newStock });
                return;
            }
            res.status(201).json(newStock);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
}
exports.default = new StockController();
