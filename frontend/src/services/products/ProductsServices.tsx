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

  static async getAll(companyId: string) {
    try {
      const token = await this.getToken();
      return await getProductsService({ token, companyId });
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
