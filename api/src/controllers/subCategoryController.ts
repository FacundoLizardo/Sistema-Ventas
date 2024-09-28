import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import SubCategoryServices from "../services/SubCategoryServices";

class SubCategoryController {
  async getSubCategories(req: Request, res: Response): Promise<void> {
    try {
      const { companyId, categoryId } = req.query as {
        companyId: string;
        categoryId?: string;
      };

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const subCategories = await SubCategoryServices.getSubCategories({
        categoryId,
      });

      if (!subCategories) {
        res.status(404).json({ message: "SubCategories not found" });
      }

      res.status(200).json({ success: true, subCategories });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postSubCategory(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const newCategory = await SubCategoryServices.postCategory(
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


  async deleteSubCategory(req: Request, res: Response): Promise<void> {
    try {
      const { companyId, id } = req.query as {
        companyId: string;
        id: string;
      };

      if (!companyId) {
        res.status(400).json({ message: "companyId is required." });
      }

      const deleteCategory = await SubCategoryServices.deleteCategory(id);

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

export default new SubCategoryController();
