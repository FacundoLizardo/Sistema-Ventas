"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
const StockServices_1 = __importDefault(require("./StockServices"));
class ProductService {
    async getProducts({ companyId, branchId, name, }) {
        try {
            const whereCondition = { companyId };
            if (branchId) {
                whereCondition.branchId = branchId;
            }
            if (name) {
                whereCondition.name = name;
            }
            const products = await db_1.Product.findAll({
                where: whereCondition,
                include: [
                    { model: db_1.Stock, as: "stock" },
                    { model: db_1.Category, as: "category" },
                    { model: db_1.SubCategory, as: "subCategory" },
                ],
                order: [["name", "ASC"]],
            });
            return products
                ? products.map((productObj) => productObj.get({ plain: true }))
                : [];
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postProduct(data, companyId, stock) {
        try {
            const existingProduct = await db_1.Product.findOne({
                where: {
                    name: data.name,
                },
            });
            if (existingProduct) {
                return "Product already exists.";
            }
            const product = await db_1.Product.create({
                ...data,
                companyId,
            });
            if (product) {
                for (const item of stock) {
                    await StockServices_1.default.postStock({
                        branchId: item.branchId,
                        productId: product.getDataValue("id"),
                        quantity: item.quantity,
                    });
                }
                return product.get({ plain: true });
            }
            else {
                return "Product not created, please try again.";
            }
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async putProduct(id, data) {
        try {
            const existingProduct = await db_1.Product.findOne({ where: { id } });
            if (!existingProduct) {
                return `The product with id: ${id} does not exist`;
            }
            await existingProduct.update(data);
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async deleteProduct(id) {
        try {
            const deletedCount = await db_1.Product.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error("Product not found");
            }
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new ProductService();
//---------- TESTS ----------
/*
      {
        "name": "Tinto",
        "category": "Vinos",
        "cost": 50.00,
        "finalPrice": 75.00,
        "discount": 10.00,
        "profitPercentage": 20,
        "stock": 100,
        "enabled": true,
        "notesDescription": "Descripción de prueba",
        "taxes": 5.00,
        "barcode": "231351655648",
        "branchId": "cb4f49aa-13f0-4b5f-805b-d8242e6987b1",
        "userId": "b3b10faa-9c9e-425e-acc4-6ec1ad574bda"
    }
*/
