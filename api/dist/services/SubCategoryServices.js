"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceError_1 = require("../utils/serviceError");
const db_1 = require("../db");
class SubCategoryService {
    async getSubCategories({ name, categoryId, }) {
        try {
            const whereCondition = {};
            if (categoryId) {
                whereCondition.categoryId = categoryId;
            }
            if (name) {
                whereCondition.name = name;
            }
            const subCategories = await db_1.SubCategory.findAll({
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
    }
    async postCategory(data, companyId) {
        try {
            const existingCategory = await db_1.SubCategory.findOne({
                where: {
                    name: data.name.toLowerCase(),
                },
            });
            if (existingCategory) {
                return "SubCategory already exists in this branch.";
            }
            const category = await db_1.SubCategory.create({
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
            const deletedCount = await db_1.SubCategory.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error("SubCategory not found");
            }
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new SubCategoryService();
//---------- TESTS ----------
/*
      {
        "name": "Tinto",
     }
*/
