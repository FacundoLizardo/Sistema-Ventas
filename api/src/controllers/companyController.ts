import { Request, Response } from "express";
import { CompanyInterface } from "../models/company";
import CompanyServices from "../services/CompanyServices";
import UserServices from "../services/UserServices";
import { controllerError } from "../utils/controllerError";

class CompanyController {
  async getCompany(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (!id) throw new Error("Company ID is required.");
      const company = await CompanyServices.getCompanyById(id);
      console.log({company});
      
      if (!company) throw new Error("Company not found.");
      res.status(200).json({ success: true, company });
    } catch (error) {
      console.log(error);
      
      controllerError(res, error, 404);
    }
  }

  async getCompanies(req: Request, res: Response): Promise<void> {
    try {
      const params = req.params;

      console.log({ params });

      const userId = params.userId;
      
      if (!userId) {
        res.status(400).json({ message: "Missing information." });
      }
      const user = await UserServices.getUser(userId);

      const companies = await CompanyServices.getAllCompanies();
      
      if (user?.role !== "SUPER_ADMIN") throw new Error("You don't have permission.");
      if (companies.length === 0) throw new Error("No companies found.");

      res.status(200).json({ success: true, companies });
    } catch (error) {
      controllerError(res, error, 404);
    }
  }

  async postCompany(req: Request, res: Response): Promise<void> {
    const data = req.body as CompanyInterface;
    try {
      if (!data.name) {
        res.status(400).json({ message: "Missing information." });
        return;
      }
      const newCompany = await CompanyServices.postCompany(data);
      if (typeof newCompany === "string") {
        res.status(400).json({ message: newCompany });
        return;
      }
      res.status(201).json(newCompany);
    } catch (error) {
      controllerError(res, error, 400);
    }
  }

  async putCompany(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = req.body as CompanyInterface;
    try {
      if (!id) throw new Error("Company ID is required.");
      const updatedCompany = await CompanyServices.putCompany(id, data);
      res.status(200).json(updatedCompany);
    } catch (error) {
      controllerError(res, error, 400);
    }
  }

  async deleteCompany(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (!id) throw new Error("Company ID is required.");
      const deletedCount = await CompanyServices.deleteCompany(id);
      if (deletedCount === 0) throw new Error("Company not found.");
      res.status(204).send();
    } catch (error) {
      controllerError(res, error, 400);
    }
  }
}

export default new CompanyController();
