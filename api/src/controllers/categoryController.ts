import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import CategoryServices from "../services/CategoryServices";

class CategoryController {
  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const { companyId, branchId, name } = req.query as {
        companyId: string;
        branchId?: string;
        name?: string;
      };

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const categories = await CategoryServices.getCategories({
        companyId,
        branchId,
        name,
      });

      if (!categories) {
        res.status(404).json({ message: "Categories not found" });
      }

      res.status(200).json({ success: true, categories });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postCategory(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const newCategory = await CategoryServices.postCategory(
        req.body,
        companyId
      );

      if (!newCategory) {
        res.status(400).json({ message: "Category not created" });
        return;
      }

      res.status(201).json(newCategory);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async putCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateProduct = await CategoryServices.putCategory(id, req.body);

      if (updateProduct !== true) {
        res.status(400).json({ message: "Category not updated." });
      } else {
        res.status(204).json({ success: true });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Category id is required" });
      }

      const deleteCategory = await CategoryServices.deleteCategory(id);

      if (deleteCategory !== true) {
        res.status(400).json({ message: "Category not deleted." });
      } else {
        res.status(204).json({ success: true });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new CategoryController();
