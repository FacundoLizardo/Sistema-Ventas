import { WhereOptions } from "sequelize";
import { serviceError } from "../utils/serviceError";
import { Category } from "../db";
import {
  CategoryCreationInterface,
  CategoryInterface,
} from "../models/category";

class CategoryService {
  async getCategories({
    companyId,
    name,
  }: {
    companyId: string;
    name?: string;
  }) {
    try {
      const whereCondition: WhereOptions = { companyId };

      if (name) {
        whereCondition.name = name;
      }

      const categories = await Category.findAll({
        where: whereCondition,
        order: [["name", "ASC"]],
      });

      return categories
        ? categories.map((productObj) => productObj.get({ plain: true }))
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postCategory(
    data: CategoryCreationInterface,
    companyId: string
  ): Promise<CategoryInterface | string> {
    try {
      const existingCategory = await Category.findOne({
        where: {
          name: data.name.toLowerCase(),
        },
      });

      if (existingCategory) {
        return "Category already exists in this branch.";
      }

      const category = await Category.create({
        ...data,
        companyId,
      });

      return category ? category.get({ plain: true }) : "";
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      if (!id) {
        throw new Error("Id is required.");
      }

      const deletedCount = await Category.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new Error("Category not found");
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new CategoryService();

//---------- TESTS ----------

/* 
      {
        "name": "Tinto",
     }
*/
