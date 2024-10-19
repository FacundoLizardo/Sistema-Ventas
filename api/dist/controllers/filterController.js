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
const FilterServices_1 = __importDefault(require("../services/FilterServices"));
const controllerError_1 = require("../utils/controllerError");
class FilterController {
    getFilterProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filteredProducts = yield FilterServices_1.default.getFilteredProducts({
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
        });
    }
}
exports.default = new FilterController();
