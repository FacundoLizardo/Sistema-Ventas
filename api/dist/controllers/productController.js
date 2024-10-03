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
const ProductsServices_1 = __importDefault(require("../services/ProductsServices"));
const controllerError_1 = require("../utils/controllerError");
class ProductController {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId, branchId, name } = req.query;
                if (!companyId) {
                    res.status(400).json({ message: "Company id is required" });
                }
                const products = yield ProductsServices_1.default.getProducts({
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
        });
    }
    postProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const newProduct = yield ProductsServices_1.default.postProduct(data, companyId, stock);
                if (!newProduct) {
                    res.status(400).json({ message: "Product not created" });
                    return;
                }
                res.status(201).json(newProduct);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    putProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateProduct = yield ProductsServices_1.default.putProduct(id, req.body);
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
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: "Product id is required" });
                }
                const deleteProduct = yield ProductsServices_1.default.deleteProduct(id);
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
        });
    }
}
exports.default = new ProductController();
