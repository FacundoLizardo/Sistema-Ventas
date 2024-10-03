"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const CategoryServices_1 = __importDefault(require("../services/CategoryServices"));
class CategoryController {
    async getCategories(req, res) {
        try {
            const { companyId, name } = req.query;
            if (!companyId) {
                res.status(400).json({ message: "Company id is required" });
            }
            const categories = await CategoryServices_1.default.getCategories({
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
    }
    async postCategory(req, res) {
        try {
            const { companyId } = req.params;
            if (!companyId) {
                res.status(400).json({ message: "Company id is required" });
            }
            const newCategory = await CategoryServices_1.default.postCategory(req.body, companyId);
            if (!newCategory) {
                res.status(400).json({ message: "Category not created" });
                return;
            }
            res.status(201).json(newCategory);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async deleteCategory(req, res) {
        try {
            const { companyId, id } = req.query;
            if (!companyId) {
                res.status(400).json({ message: "companyId is required." });
            }
            const deleteCategory = await CategoryServices_1.default.deleteCategory(id);
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
    }
}
exports.default = new CategoryController();
