import { accessToken } from "../accessToken";
import { deleteCategoryService } from "./deleteCategoryService";
import { getCategoryService } from "./getCategoriesService";
import { postCategoryService } from "./postCategoryService";

export interface ICategory {
  id: string;
  name: string;
  description?: string;
}

export interface ICategoryCreate extends Omit<ICategory, "id"> {}

class CategoriesServices {
  static async getToken() {
    try {
      const token = accessToken();
      return token;
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }

  static async get({ companyId, name }: { companyId: string; name?: string }) {
    try {
      const token = await this.getToken();
      return await getCategoryService({ token, companyId, name });
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }

  static async post({
    params,
    companyId,
  }: {
    params: ICategoryCreate;
    companyId: string;
  }) {
    try {
      const token = await this.getToken();
      return await postCategoryService({ params, token, companyId });
    } catch (error) {
      console.error("Error posting category:", error);
      throw error;
    }
  }

  static async delete({ companyId, id }: { companyId: string; id: string }) {
    try {
      const token = await this.getToken();
      return await deleteCategoryService({ token, companyId, id });
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}

export default CategoriesServices;
