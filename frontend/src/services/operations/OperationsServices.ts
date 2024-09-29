import { accessToken } from "../accessToken";
import { getOperationsService } from "./getOperationsService";

class OperationsServices {
  static async getToken() {
    try {
      const token = accessToken();
      return token;
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }

  static async get({
    companyId,
    startDate,
    endDate,
  }: {
    companyId: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      const token = await this.getToken();
      return await getOperationsService({
        token,
        companyId,
        endDate,
        startDate,
      });
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }
}

export default OperationsServices;
