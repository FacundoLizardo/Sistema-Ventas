"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const SubCategoryServices_1 = __importDefault(require("../services/SubCategoryServices"));
class SubCategoryController {
    async getSubCategories(req, res) {
        try {
            const { companyId, categoryId } = req.query;
            if (!companyId) {
                res.status(400).json({ message: "Company id is required" });
            }
            const subCategories = await SubCategoryServices_1.default.getSubCategories({
                categoryId,
            });
            if (!subCategories) {
                res.status(404).json({ message: "SubCategories not found" });
            }
            res.status(200).json({ success: true, subCategories });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async postSubCategory(req, res) {
        try {
            const { companyId } = req.params;
            if (!companyId) {
                res.status(400).json({ message: "Company id is required" });
            }
            const newCategory = await SubCategoryServices_1.default.postCategory(req.body, companyId);
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
    async deleteSubCategory(req, res) {
        try {
            const { companyId, id } = req.query;
            if (!companyId) {
                res.status(400).json({ message: "companyId is required." });
            }
            const deleteCategory = await SubCategoryServices_1.default.deleteCategory(id);
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
exports.default = new SubCategoryController();
