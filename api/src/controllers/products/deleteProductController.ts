import { Product } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const deleteProductController = async (productId: string) => {
  try {
    const deleteProduct = await Product.destroy({
      where: { id: productId },
    });

    if (deleteProduct === 0) {
      return `Operation whit the ID: ${productId} does not exist`;
    }
	
    return deleteProduct;
  } catch (error) {
    controllerError(error);
  }
};
