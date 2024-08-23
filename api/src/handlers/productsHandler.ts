import { Request, Response } from "express";
import { getProductController } from "../controllers/products/getProductController";
import {
  getProductCategoriesController,
  getProductsController,
} from "../controllers/products/getProductsController";
import { createError } from "../utils/createError";
import { handlerError } from "../utils/handlerError";
import { deleteProductController } from "../controllers/products/deleteProductController";
import { postProductController } from "../controllers/products/postProductController";
import { putProductController } from "../controllers/products/putProductsControllers";

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  console.log("id", id);

  try {
    const product = await getProductController(id);

    if (!product) {
      throw createError("No product found.", 404);
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getProductsController();

    if (!products) {
      throw createError("No products found.", 404);
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await getProductCategoriesController();

    if (!categories) {
      throw createError("No categories found.", 404);
    }

    res.status(200).json(categories);
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const postProducts = async (req: Request, res: Response) => {
  try {
    const newProduct = await postProductController({ req });

    if (!newProduct) {
      throw createError(
        "Product not created because it already exists or something is wrong, please try again",
        400
      );
    }

    res.status(200).json(newProduct);
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const putProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const stockChange = req.body.stockChange;
    
    const updatedProduct = await putProductController({
      productId,
      stockChange,
      req,
    });

    if (!updatedProduct) {
      throw createError(
        "Product not updated because it already exists or something is wrong, please try again",
        400
      );
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await deleteProductController(productId);

    if (!deletedProduct) {
      throw createError(
        "Product not deleted because it already exists or something is wrong, please try again",
        400
      );
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    handlerError(res, error, 400);
  }
};
