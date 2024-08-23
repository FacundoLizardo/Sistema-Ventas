import { Product } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const getProductsController = async () => {
  try {
    const products = await Product.findAll();
    return products || [];
  } catch (error) {
    controllerError(error);
  }
};

export const getProductCategoriesController = async (): Promise<string[]> => {
  try {
    const categories = await Product.findAll({
      attributes: ["category"],
      group: ["category"],
    });
    return categories.map((categoryObj) =>
      categoryObj.getDataValue("category")
    );
  } catch (error) {
    controllerError(error);
  }
};
