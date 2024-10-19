import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import CompanyServices from "../services/CompanyServices";
import { CompanyInterface } from "../models/company";

class CompanyController {
  async getCompany(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(404).json({ message: "Company id is required" });
      }

      const company = await CompanyServices.getCompanyById(id);

      if (!company) {
        res.status(404).json({ message: "Company not found" });
        return;
      }

      res.status(200).json({ success: true, company });
    } catch (error) {
      controllerError(res, error, 404);
    }
  }

  async getCompanies(_req: Request, res: Response): Promise<void> {
    try {
      const companies = await CompanyServices.getAllCompanies();

      if (!companies) {
        res.status(404).json({ message: "Companies not found" });
        return;
      }

      res.status(200).json({ success: true, companies });
    } catch (error) {
      controllerError(res, error, 404);
    }
  }

  async postCompany(req: Request, res: Response): Promise<void> {
    const data = req.body as CompanyInterface;
    try {
      if (!data.razonSocial) {
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
