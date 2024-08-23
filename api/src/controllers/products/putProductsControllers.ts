import { ProductInterface } from "../../models/product";
import { controllerError } from "../../utils/controllerError";
import { Request } from "express";

import { Product } from "../../db";

export interface ProductUpdateInterface extends ProductInterface {
  productId: string;
}

export const putProductController = async ({
  productId,
  req,
}: {
  req: Request;
  stockChange?: number;
  productId: string;
}) => {
  const {
    name,
    category,
    cost,
    finalPrice,
    discount,
    profitPercentage,
    stock,
    allowNegativeStock,
    trackStock,
    minimumStock,
    enabled,
    notesDescription,
    taxes,
    barcode,
  } = req.body;

  try {
    console.log("productId en el controller ", productId);
    const existingProduct = await Product.findOne({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error(`The product with the id: ${productId} does not exist`);
    }

    await existingProduct.update({
      name,
      category,
      cost,
      finalPrice,
      discount,
      profitPercentage,
      stock,
      allowNegativeStock,
      trackStock,
      minimumStock,
      enabled,
      notesDescription,
      taxes,
      barcode,
    });
    return true;
  } catch (error) {
    controllerError(error);
  }
};
