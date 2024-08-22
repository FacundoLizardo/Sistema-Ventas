import { Request, Response } from "express";
import { getProductController } from "../controllers/products/getProductController";
import { getProductsController } from "../controllers/products/getProductsController";
import { createError } from "../utils/errorUtils";
import { handleError } from "../utils/errorHandler";

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await getProductController(id);
    if (product) {
      res.status(200).json({ success: true, product });
    } else {
      throw createError("No product found.", 404);
    }
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getProductsController();
    if (products) {
      res.status(200).json({ success: true, products });
    } else {
      throw createError("No products found.", 404);
    }
  } catch (error) {
    handleError(res, error, 400);
  }
};
/* 
const getCategories = async (req, res) => {
    try {
        const categories = await getProductCategoriesController()
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}


const postProducts = async (req, res) => {
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
    if (!name || !category || !stock) {
        return res.status(404).json("Missing information.");
    }
    try {
        const newProduct = await postProductController(
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
            barcode
        );
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const putProduct = async (req, res) => {
    try {
        const productId = req.params.id;
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

        const updatedProduct = await editProductController(
            productId,
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
            barcode
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await deleteProductController(productId);
        res.status(200).json(deletedProduct);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};


  */
