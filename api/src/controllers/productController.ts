import { Request, Response } from "express";
import ProductService from "../services/ProductsServices";
import { controllerError } from "../utils/controllerError";

class ProductController {
  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await ProductService.getProduct(id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json({ success: true, product });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getProducts(_req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json({ success: true, products });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getCategories(_req: Request, res: Response): Promise<void> {
    try {
      const categories = await ProductService.getCategories();

      if (!categories.length) {
        res.status(404).json({ message: "No categories found" });
        return;
      }

      res.status(200).json({ success: true, categories });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postProduct(req: Request, res: Response): Promise<void> {
    try {
      const newProduct = await ProductService.postProduct(req.body);

      if (typeof newProduct === "string") {
        res.status(400).json({ message: newProduct });
        return;
      }

      res.status(201).json(newProduct);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async putProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateProduct = await ProductService.putProduct(id, req.body);

      if (updateProduct !== true) {
        res.status(400).json({ message: "Product not updated." });
      } else {
        res.status(204).json({ success: true });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteProduct = await ProductService.deleteProduct(id);

      if (deleteProduct !== true) {
        res.status(400).json({ message: "Product not deleted." });
      } else {
        res.status(204).json({ success: true });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new ProductController();
