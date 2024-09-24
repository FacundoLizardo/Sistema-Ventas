import { accessToken } from "../accessToken";
import { postAfipService } from "./postAfipService";

class BranchesServices {
  static async getToken() {
    try {
      const token = accessToken();
      return token;
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }

  static async getAll({ companyId }: { companyId: string }) {
    try {
      const token = await this.getToken();
      return await postAfipService({ token, companyId });
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }
}

export default BranchesServices;
