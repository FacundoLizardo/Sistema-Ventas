import { Customer } from "../db";
import {
  CustomerCreationInterface,
  CustomerInterface,
} from "../models/customer";
import { serviceError } from "../utils/serviceError";

class CustomerService {
  async getCustomer(id: string): Promise<CustomerInterface | null> {
    try {
      const customer = await Customer.findByPk(id);
      return customer
        ? (customer.get({ plain: true }) as CustomerInterface)
        : null;
    } catch (error) {
      serviceError(error);
    }
  }

  async getCustomerByQuery(query: {
    dni?: string;
    cuil?: string;
    cuit?: string;
    passport?: string;
  }): Promise<CustomerInterface | null> {
    try {
      const { dni, cuil, cuit, passport } = query;

      let customer;
      if (dni) {
        customer = await Customer.findOne({
          where: { dni: parseInt(dni, 10) },
        });
      } else if (cuil) {
        customer = await Customer.findOne({
          where: { cuil: parseInt(cuil, 10) },
        });
      } else if (cuit) {
        customer = await Customer.findOne({
          where: { cuit: parseInt(cuit, 10) },
        });
      } else if (passport) {
        customer = await Customer.findOne({ where: { passport } });
      } else {
        throw new Error("No valid identifier provided.");
      }

      return customer
        ? (customer.get({ plain: true }) as CustomerInterface)
        : null;
    } catch (error) {
      serviceError(error);
      return null; // Retorna null en caso de error
    }
  }

  async getCustomers(): Promise<CustomerInterface[]> {
    try {
      const customers = await Customer.findAll();
      return customers
        ? customers.map((customerObj) => customerObj.get({ plain: true }))
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postCustomer(
    data: CustomerCreationInterface,
    companyId?: string
  ): Promise<CustomerInterface | string> {
    try {
      let whereClause: any = {};

      if (data.customerType === "person") {
        if (data.dni !== undefined) {
          whereClause.dni = data.dni;
        } else if (data.cuil !== undefined) {
          whereClause.cuil = data.cuil;
        } else if (data.passport !== undefined) {
          whereClause.passport = data.passport;
        } else {
          return "Invalid data: Missing DNI, CUIL, or passport for a person.";
        }
      } else if (data.customerType === "company") {
        if (data.cuit !== undefined) {
          whereClause.cuit = data.cuit;
        } else {
          return "Invalid data: Missing CUIT for a company.";
        }
      } else {
        return "Invalid data: Unknown customer type.";
      }

      const [customer, created] = await Customer.findOrCreate({
        where: whereClause,
        defaults: {
          ...data,
          companyId,
        },
      });

      if (created) {
        return customer.get({ plain: true }) as CustomerInterface;
      } else {
        return "Customer not created because it already exists or something is wrong, please try again.";
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async putCustomer(
    dni: string,
    data: CustomerCreationInterface
  ): Promise<boolean | string> {
    try {
      const existingCustomer = await Customer.findOne({ where: { dni } });

      if (!existingCustomer) {
        return `The customer with dni: ${dni} does not exist`;
      }

      await existingCustomer.update(data);
      return true;
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteCustomer(dni: string): Promise<boolean> {
    try {
      const deletedCount = await Customer.destroy({ where: { dni } });

      if (deletedCount === 0) {
        throw new Error("Customer not found");
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new CustomerService();

//---------- TESTS ----------

/* 
    CLIENTE EMPRESA

    {
      "cuit": "30708012345",
      "companyName": "Tech Solutions S.A.",
      "email": "info@techsolutions.com",
      "address": "456 Industrial Ave, Buenos Aires",
      "phoneNumber": "011-4567-8900",
      "enableDebt": false
    }


    CLIENTE PERSONA

    {
      "dni": 33693450,
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@example.com",
      "address": "Av. Siempre Viva 742, Springfield",
      "phoneNumber": "011-1234-5678",
      "dateOfBirth": "1990-05-10",
      "enableDebt": true
    }

*/
