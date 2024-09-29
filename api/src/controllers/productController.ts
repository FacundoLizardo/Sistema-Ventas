import { Request, Response } from "express";
import ProductService from "../services/ProductsServices";
import { controllerError } from "../utils/controllerError";
import { ProductCreationInterface } from "../models/product";

class ProductController {
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const { companyId, branchId, name } = req.query as {
        companyId: string;
        branchId?: string;
        name?: string;
      };

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const products = await ProductService.getProducts({
        companyId,
        branchId,
        name,
      });

      if (!products) {
        res.status(404).json({ message: "Products not found" });
      }

      res.status(200).json({ success: true, products });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postProduct(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;
      const stock = req.body.stock as { branchId: string; quantity: number }[];
      const data = req.body as ProductCreationInterface;

      if (!companyId) {
        res
          .status(400)
          .json({ message: "CompanyId is required." });
        return;
      }

      const newProduct = await ProductService.postProduct(
        data,
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
