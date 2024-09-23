import { getProductsService } from "./getProductsService";
import { postProductService } from "./postProductsService";
import { accessToken } from "../accessToken";

export interface IProduct {
  id: string;
  name: string;
  category?: string;
  cost?: number;
  finalPrice?: number;
  discount?: number;
  profitPercentage?: number;
  stock: number;
  allowNegativeStock: boolean;
  trackStock: boolean;
  minimumStock: number;
  enabled: boolean;
  notesDescription?: string;
  taxes?: number;
  barcode: string;
}

export interface IProductCreate extends Omit<IProduct, "id"> {}

export type AfipProducts = Pick<IProduct, "id" | "name" | "finalPrice">;

class ProductsServices {
  static async getToken() {
    try {
      const token = accessToken();
      return token;
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }

  static async getAll({
    companyId,
    branchId,
    name,
  }: {
    companyId: string;
    branchId?: string;
    name?: string;
  }) {
    try {
      const token = await this.getToken();
      return await getProductsService({ token, companyId, branchId, name });
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }

  static async post(params: IProductCreate) {
    try {
      const token = await this.getToken();
      return await postProductService(params, token);
    } catch (error) {
      console.error("Error posting product:", error);
      throw error;
    }
  }
}

export default ProductsServices;
