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
Object.defineProperty(exports, "__esModule", { value: true });
const serviceError_1 = require("../utils/serviceError");
const db_1 = require("../db");
class SubCategoryService {
    getSubCategories(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, categoryId, }) {
            try {
                const whereCondition = {};
                if (categoryId) {
                    whereCondition.categoryId = categoryId;
                }
                if (name) {
                    whereCondition.name = name;
                }
                const subCategories = yield db_1.SubCategory.findAll({
                    where: whereCondition,
                    order: [["name", "ASC"]],
                });
                return subCategories
                    ? subCategories.map((productObj) => productObj.get({ plain: true }))
                    : [];
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    postCategory(data, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCategory = yield db_1.SubCategory.findOne({
                    where: {
                        name: data.name.toLowerCase(),
                    },
                });
                if (existingCategory) {
                    return "SubCategory already exists in this branch.";
                }
                const category = yield db_1.SubCategory.create(Object.assign(Object.assign({}, data), { companyId }));
                return category ? category.get({ plain: true }) : "";
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error("Id is required.");
                }
                const deletedCount = yield db_1.SubCategory.destroy({ where: { id } });
                if (deletedCount === 0) {
                    throw new Error("SubCategory not found");
                }
                return true;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
}
exports.default = new SubCategoryService();
//---------- TESTS ----------
/*
      {
        "name": "Tinto",
     }
*/
