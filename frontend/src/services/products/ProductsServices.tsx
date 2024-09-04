import { withAccessToken } from "../withAccessToken";
import { getProductsService } from "./getProductsService";
import { postProductService } from "./postProductsService";

class ProductsServices {
  getProducts = withAccessToken(getProductsService);
  postProduct = withAccessToken(postProductService)
}

export default new ProductsServices();
