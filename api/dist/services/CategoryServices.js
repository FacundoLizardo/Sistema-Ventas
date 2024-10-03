"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceError_1 = require("../utils/serviceError");
const db_1 = require("../db");
class CategoryService {
    async getCategories({ companyId, name, }) {
        try {
            const whereCondition = { companyId };
            if (name) {
                whereCondition.name = name;
            }
            const categories = await db_1.Category.findAll({
                where: whereCondition,
                order: [["name", "ASC"]],
            });
            return categories
                ? categories.map((productObj) => productObj.get({ plain: true }))
                : [];
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postCategory(data, companyId) {
        try {
            const existingCategory = await db_1.Category.findOne({
                where: {
                    name: data.name.toLowerCase(),
                },
            });
            if (existingCategory) {
                return "Category already exists in this branch.";
            }
            const category = await db_1.Category.create({
                ...data,
                companyId,
            });
            return category ? category.get({ plain: true }) : "";
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async deleteCategory(id) {
        try {
            if (!id) {
                throw new Error("Id is required.");
            }
            const deletedCount = await db_1.Category.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error("Category not found");
            }
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new CategoryService();
//---------- TESTS ----------
/*
      {
        "name": "Tinto",
     }
*/
