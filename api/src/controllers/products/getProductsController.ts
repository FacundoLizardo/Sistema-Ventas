import { Product } from "../../db";
import { errorController } from "../../utils/errorController";

export const getProductsController = async () => {
  try {
    const products = await Product.findAll();
    return products || [];
  } catch (error) {
    errorController(error);
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
    errorController(error);
  }
};
