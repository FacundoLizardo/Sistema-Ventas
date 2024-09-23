import { Request, Response } from "express";
import ProductService from "../services/ProductsServices";
import { controllerError } from "../utils/controllerError";

class ProductController {
  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(404).json({ message: "Product id is required" });
      }

      const product = await ProductService.getProduct(id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ success: true, product });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const companyId = req.query.companyId as string;

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const products = await ProductService.getProducts(companyId);

      if (!products) {
        res.status(404).json({ message: "Products not found" });
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
      }

      res.status(200).json({ success: true, categories });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postProduct(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;
      const { stock, ...productData } = req.body;
  
      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
        return; 
      }
  
      const newProduct = await ProductService.postProduct(
        productData,
        companyId,
        stock
      );
  
      if (!newProduct) {
        res.status(400).json({ message: "Product not created" });
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

      if (!id) {
        res.status(400).json({ message: "Product id is required" });
      }

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
