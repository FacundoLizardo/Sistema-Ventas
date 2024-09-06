import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import CustomerService from "../services/CustomerServices";

class CustomerController {
  async getCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const customer = await CustomerService.getCustomer(id);

      if (!customer) {
        res.status(404).json({ message: "Customer not found" });
        return;
      }

      res.status(200).json({ success: true, customer });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getCustomerByDNI(req: Request, res: Response): Promise<void> {
    try {
      const { DNI } = req.params;

      const customer = await CustomerService.getCustomerWithDNI(DNI);

      if (!customer) {
        res.status(404).json({ message: "Customer not found" });
        return;
      }

      res.status(200).json({ success: true, customer });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async getCustomers(_req: Request, res: Response): Promise<void> {
    try {
      const customers = await CustomerService.getCustomers();

      if (!customers.length) {
        res.status(404).json({ message: "No customers found" });
        return;
      }

      res.status(200).json({ success: true, customers });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }

  async postCustomer(req: Request, res: Response): Promise<void> {
    try {
      const companyId = req.params.companyId;
      const newCustomer = await CustomerService.postCustomer(req.body, companyId);

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
