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
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
const StockServices_1 = __importDefault(require("./StockServices"));
class ProductService {
    getProducts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId, branchId, name, }) {
            try {
                const whereCondition = { companyId };
                if (branchId) {
                    whereCondition.branchId = branchId;
                }
                if (name) {
                    whereCondition.name = name;
                }
                const products = yield db_1.Product.findAll({
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
        });
    }
    postProduct(data, companyId, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield db_1.Product.findOne({
                    where: {
                        name: data.name,
                    },
                });
                if (existingProduct) {
                    return "Product already exists.";
                }
                const product = yield db_1.Product.create(Object.assign(Object.assign({}, data), { companyId }));
                if (product) {
                    for (const item of stock) {
                        yield StockServices_1.default.postStock({
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
        });
    }
    putProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield db_1.Product.findOne({ where: { id } });
                if (!existingProduct) {
                    return `The product with id: ${id} does not exist`;
                }
                yield existingProduct.update(data);
                return true;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield db_1.Product.destroy({ where: { id } });
                if (deletedCount === 0) {
                    throw new Error("Product not found");
                }
                return true;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
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
