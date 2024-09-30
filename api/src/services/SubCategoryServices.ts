import { WhereOptions } from "sequelize";
import { serviceError } from "../utils/serviceError";
import { SubCategory } from "../db";
import {
  SubCategoryCreationInterface,
  SubCategoryInterface,
} from "../models/subCategory";

class SubCategoryService {
  async getSubCategories({
    name,
    categoryId,
  }: {
    categoryId?: string;
    name?: string;
  }) {
    try {
      const whereCondition: WhereOptions = {};

      if (categoryId) {
        whereCondition.categoryId = categoryId;
      }

      if (name) {
        whereCondition.name = name;
      }

      const subCategories = await SubCategory.findAll({
        where: whereCondition,
        order: [["name", "ASC"]],
      });

      return subCategories
        ? subCategories.map((productObj) => productObj.get({ plain: true }))
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postCategory(
    data: SubCategoryCreationInterface,
    companyId: string
  ): Promise<SubCategoryInterface | string> {
    try {
      const existingCategory = await SubCategory.findOne({
        where: {
          name: data.name.toLowerCase(),
        },
      });

      if (existingCategory) {
        return "SubCategory already exists in this branch.";
      }

      const category = await SubCategory.create({
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

      const deletedCount = await SubCategory.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new Error("SubCategory not found");
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new SubCategoryService();

//---------- TESTS ----------

/* 
      {
        "name": "Tinto",
     }
*/
