import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import CustomerService from "../services/CustomerServices";

class CustomerController {
  async getCustomers(req: Request, res: Response): Promise<void> {
    try {
      const { companyId, docTipo, docNro, name, id } = req.query as {
        companyId?: string;
        docTipo?: string;
        docNro?: string;
        name?: string;
        id?: string;
      };

      if (!companyId) {
        res.status(400).json({ message: "CompanyId are required" });
        return;
      }

      const customer = await CustomerService.getCustomers({
        companyId,
        docTipo,
        docNro,
        name,
        id,
      });

      if (!customer) {
        res.status(404).json({ message: "Customer not found" });
        return;
      }

      res.status(200).json({ success: true, customer });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;

      if (!companyId) {
        res.status(400).json({ message: "Company id is required" });
      }

      const newCustomer = await CustomerService.postCustomer(
        req.body,
        companyId
      );

      if (typeof newCustomer === "string") {
        res.status(400).json({ message: newCustomer });
        return;
      }

      res.status(201).json(newCustomer);
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async putCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateResult = await CustomerService.putCustomer(id, req.body);

      if (updateResult === true) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: updateResult });
      }
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async deleteCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteResult = await CustomerService.deleteCustomer(id);

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

export default new CustomerController();
