import { getProductsService } from "./getProductsService";
import { accessToken } from "../accessToken";
import { postProductService } from "./postProductService";
import { putProductService } from "./putProductService";
import { deleteProductService } from "./deleteProductService";

export interface IProduct {
  id: string;
  name: string;
  category?: {
    id: string;
    name: string;
  };
  subCategory?: {
    id: string;
    name: string;
  };
  cost?: number;
  finalPrice?: number;
  discount?: number;
  profitPercentage?: number;
  stock?: {
    id?: string;
    branchId: string;
    quantity: number;
  }[];
  allowNegativeStock?: boolean;
  trackStock?: boolean;
  minimumStock?: number;
  enabled: boolean;
  notesDescription?: string;
  taxes?: number;
  barcode?: string;
}

export interface IProductCreate extends Omit<IProduct, "id"> {
  userId: string;
  categoryId?: string;
  subCategoryId?: string;
}

export type IProductFull = IProduct & IProductCreate
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

  static async get({
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

  static async post({
    params,
    companyId,
  }: {
    params: IProductCreate;
    companyId: string;
  }) {
    try {
      const token = await this.getToken();
      return await postProductService({ params, token, companyId });
    } catch (error) {
      console.error("Error posting product:", error);
      throw error;
    }
  }

  static async put({
    params,
    productId,
    enabled,
  }: {
    params?: IProductCreate;
    productId: string;
    enabled?: boolean;
  }) {
    try {
      const token = await this.getToken();
      return await putProductService({ params, token, productId, enabled });
    } catch (error) {
      console.error("Error posting product:", error);
      throw error;
    }
  }

  static async delete({ companyId, id }: { companyId: string; id: string }) {
    try {
      const token = await this.getToken();
      return await deleteProductService({ token, companyId, id });
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

export default ProductsServices;
