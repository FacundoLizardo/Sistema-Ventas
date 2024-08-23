import { Product } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const getProductController = async (id: string) => {
  try {
    const product = await Product.findByPk(id);
    return product || [];
  } catch (error) {
    controllerError(error);
  }
};
