import { accessToken } from "../accessToken";
import { AfipProducts } from "../products/ProductsServices";
import { getOperationsService } from "./getOperationsService";

export interface IOperation {
  id: string;
  products: AfipProducts[]  
  amount: string;
  discount: number;
  extraCharge: number;
  debtAmount: string;
  branchId: string;
  paymentType: string;
  invoiceNumber: string;
  state: string;
  isDelivery: boolean;
  deliveryAddress: string | null;
  customer: string;
  comments: string;
  invoiceLink: string;
  cbteTipo: number;
  createdAt: string;
  updatedAt: string;
  companyId: string;
  user: string;
}

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
    userId
  }: {
    companyId: string;
    startDate: string;
    endDate: string;
    userId?: string;
  }) {
    try {
      const token = await this.getToken();
      return await getOperationsService({
        token,
        companyId,
        endDate,
        startDate,
        userId
      });
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }
}

export default OperationsServices;
