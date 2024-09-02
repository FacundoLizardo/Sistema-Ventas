import FilterServices from "../services/FilterServices";
import { controllerError } from "../utils/controllerError";
import { Request, Response } from "express";

class FilterController {
  async getFilterProducts(req: Request, res: Response) {
    try {
      const filteredProducts = await FilterServices.getFilteredProducts({
        req,
      });

      if (!filteredProducts) {
        res.status(404).json({ message: "No results were found." });
      }

      res.status(200).json(filteredProducts);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new FilterController();
