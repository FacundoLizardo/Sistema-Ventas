import { withAccessToken } from "../withAccessToken";
import { getProductsService } from "./getProductsService";

class ProductsServices {
  getProducts = withAccessToken(getProductsService);
}

export default new ProductsServices();
