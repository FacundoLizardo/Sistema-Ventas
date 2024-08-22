import { Product } from "../../db";
import { errorController } from "../../utils/errorController";

export const getProductController = async (id: string) => {
  try {
    const product = await Product.findByPk(id);
    return product || [];
  } catch (error) {
    errorController(error);
  }
};
