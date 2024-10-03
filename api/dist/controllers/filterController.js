"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FilterServices_1 = __importDefault(require("../services/FilterServices"));
const controllerError_1 = require("../utils/controllerError");
class FilterController {
    async getFilterProducts(req, res) {
        try {
            const filteredProducts = await FilterServices_1.default.getFilteredProducts({
                req,
            });
            if (!filteredProducts) {
                res.status(404).json({ message: "No results were found." });
            }
            res.status(200).json(filteredProducts);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
}
exports.default = new FilterController();
