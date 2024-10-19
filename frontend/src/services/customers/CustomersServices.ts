import { accessToken } from "../accessToken";
import { deleteCustomerService } from "./deleteCustomerService";
import { getCustomerService } from "./getCustomerService";
import { postCustomerService } from "./postCustomerService";

export interface ICustomer {
  id: string;
  customerType: "person" | "company";
  passport?: string;
  docTipo?: string;
  docNro?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  enableDebt?: boolean;
}

export interface ICustomerCreate extends Omit<ICustomer, "id"> {}

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
    docTipo?: string;
    docNro?: string;
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

  static async post({
    params,
    companyId,
  }: {
    params: ICustomerCreate;
    companyId: string;
  }) {
    try {
      const token = await this.getToken();

      await postCustomerService({ params, token, companyId });
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }

  static async delete({ companyId, id }: { companyId: string; id: string }) {
    try {
      const token = await this.getToken();
      await deleteCustomerService({ token, companyId, id });
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }
}

export default CustomersServices;
