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

      if (!products.length) {
        res.status(404).json({ message: "No products found" });
        return;
      }

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
      const updateResult = await ProductService.putProduct(id, req.body);

      if (updateResult === true) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: updateResult });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteResult = await ProductService.deleteProduct(id);

      if (deleteResult === true) {
        res.status(204).json({ success: true });
      } else {
        res.status(404).json({ message: deleteResult });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new ProductController();
