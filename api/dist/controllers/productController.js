"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductsServices_1 = __importDefault(require("../services/ProductsServices"));
const controllerError_1 = require("../utils/controllerError");
class ProductController {
    async getProducts(req, res) {
        try {
            const { companyId, branchId, name } = req.query;
            if (!companyId) {
                res.status(400).json({ message: "Company id is required" });
            }
            const products = await ProductsServices_1.default.getProducts({
                companyId,
                branchId,
                name,
            });
            if (!products) {
                res.status(404).json({ message: "Products not found" });
            }
            res.status(200).json({ success: true, products });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async postProduct(req, res) {
        try {
            const { companyId } = req.params;
            const stock = req.body.stock;
            const data = req.body;
            if (!companyId) {
                res
                    .status(400)
                    .json({ message: "CompanyId is required." });
                return;
            }
            const newProduct = await ProductsServices_1.default.postProduct(data, companyId, stock);
            if (!newProduct) {
                res.status(400).json({ message: "Product not created" });
                return;
            }
            res.status(201).json(newProduct);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async putProduct(req, res) {
        try {
            const { id } = req.params;
            const updateProduct = await ProductsServices_1.default.putProduct(id, req.body);
            if (updateProduct !== true) {
                res.status(400).json({ message: "Product not updated." });
            }
            else {
                res.status(204).json({ success: true });
            }
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: "Product id is required" });
            }
            const deleteProduct = await ProductsServices_1.default.deleteProduct(id);
            if (deleteProduct !== true) {
                res.status(400).json({ message: "Product not deleted." });
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
exports.default = new ProductController();
