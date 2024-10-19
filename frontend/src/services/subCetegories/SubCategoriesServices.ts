import { accessToken } from "../accessToken";
import { deleteSubCategoryService } from "./deleteSubCategoryService";
import { getSubCategoryService } from "./getSubCategoriesService";
import { postSubCategoryService } from "./postSubCategoryService";

export interface ISubCategory {
  id: string;
  name: string;
  categoryId: string;
  description?: string;
}

export interface ISubCategoryCreate extends Omit<ISubCategory, "id"> {}

class SubCategoriesServices {
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
      return await getSubCategoryService({ token, companyId, name });
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }

  static async post({
    params,
    companyId,
  }: {
    params: ISubCategoryCreate;
    companyId: string;
  }) {
    try {
      const token = await this.getToken();
      return await postSubCategoryService({ params, token, companyId });
    } catch (error) {
      console.error("Error posting category:", error);
      throw error;
    }
  }

  static async delete({ companyId, id }: { companyId: string; id: string }) {
    try {
      const token = await this.getToken();
      return await deleteSubCategoryService({ token, companyId, id });
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}

export default SubCategoriesServices;
