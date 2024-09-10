// src/services/products/ProductsServices.ts
import { ProductInterface } from "@/types";
import { cookies } from "next/headers";
import { getProductsService } from "./getProductsService";
import { postProductService } from "./postProductsService";
import { accessToken } from "../accessToken";

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

  static async getAll() {
    try {
      const token = await this.getToken();
      console.log("token extract", token);
      
      return await getProductsService(token);
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }

  static async post(params: ProductInterface) {
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
