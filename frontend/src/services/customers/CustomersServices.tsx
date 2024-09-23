import { accessToken } from "../accessToken";
import { getCustomerService } from "./getCustomerService";

export interface ICustomer {
  id: string;
  customerType: "person" | "company";
  dni?: number;
  passport?: string;
  cuit?: number;
  cuil?: number;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  enableDebt?: boolean;
}

class CustomersServices {
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
    docTipo,
    docNro,
  }: {
    companyId: string;
    docTipo: string;
    docNro: string;
  }) {
    try {
      const token = await this.getToken();

      const response = await getCustomerService({
        token,
        companyId,
        docTipo,
        docNro,
      });

      return response;
    } catch (error) {
      console.error("Error getting company:", error);
      throw error;
    }
  }
}

export default CustomersServices;
