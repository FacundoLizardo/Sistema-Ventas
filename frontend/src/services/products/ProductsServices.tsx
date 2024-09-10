import { getProductsService } from "./getProductsService";
import { postProductService } from "./postProductsService";
import { accessToken } from "../accessToken";

export interface ProductInterface {
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

export interface ProductCreationInterface {
  name: string;
  stock?: number | undefined;
  allowNegativeStock: boolean;
  trackStock: boolean;
  minimumStock?: number | undefined;
  enabled: boolean;
  notesDescription?: string | undefined;
  taxes?: number | undefined;
  barcode?: string | undefined;
  category?: string | undefined;
  cost?: number | undefined;
  finalPrice?: number | undefined;
  discount?: number | undefined;
  profitPercentage?: number | undefined;
}

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

  static async post(params: ProductCreationInterface) {
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
