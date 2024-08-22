import { Product } from "../../db";

export const getProductController = async (id: string) => {
  try {
    const product = await Product.findByPk(id);
    return product || [];
  } catch (error) {
    throw new Error(`${error}`);
  }
};
