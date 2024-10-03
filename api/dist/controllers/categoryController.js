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
const CategoryServices_1 = __importDefault(require("../services/CategoryServices"));
class CategoryController {
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId, name } = req.query;
                if (!companyId) {
                    res.status(400).json({ message: "Company id is required" });
                }
                const categories = yield CategoryServices_1.default.getCategories({
                    companyId,
                    name,
                });
                if (!categories) {
                    res.status(404).json({ message: "Categories not found" });
                }
                res.status(200).json({ success: true, categories });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    postCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.params;
                if (!companyId) {
                    res.status(400).json({ message: "Company id is required" });
                }
                const newCategory = yield CategoryServices_1.default.postCategory(req.body, companyId);
                if (!newCategory) {
                    res.status(400).json({ message: "Category not created" });
                    return;
                }
                res.status(201).json(newCategory);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId, id } = req.query;
                if (!companyId) {
                    res.status(400).json({ message: "companyId is required." });
                }
                const deleteCategory = yield CategoryServices_1.default.deleteCategory(id);
                if (deleteCategory !== true) {
                    res.status(400).json({ message: "Category not deleted." });
                }
                else {
                    res.status(204).json({ success: true });
                }
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
}
exports.default = new CategoryController();
