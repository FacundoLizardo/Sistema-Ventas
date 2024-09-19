import { Customer } from "../db";
import {
  CustomerCreationInterface,
  CustomerInterface,
} from "../models/customer";
import { serviceError } from "../utils/serviceError";

class CustomerService {
  async getCustomer({
    customerId,
    companyId,
  }: {
    customerId?: string;
    companyId?: string;
  }): Promise<CustomerInterface | null> {
    try {
      const customer = await Customer.findOne({
        where: { id: customerId, companyId },
      });

      return customer
        ? (customer.get({ plain: true }) as CustomerInterface)
        : null;
    } catch (error) {
      serviceError(error);
    }
  }

  async getCustomerByDocument(
    data: Partial<CustomerInterface>
  ): Promise<CustomerInterface | null> {
    try {
      const { dni, cuil, cuit, passport } = data;

      const whereCondition: any = {};

      if (passport) {
        whereCondition.passport = passport;
      } else if (cuit) {
        whereCondition.cuit = cuit;
      } else if (cuil) {
        whereCondition.cuil = cuil;
      } else if (dni) {
        whereCondition.dni = dni;
      }

      const customer = await Customer.findOne({ where: whereCondition });

      return customer
        ? (customer.get({ plain: true }) as CustomerInterface)
        : null;
    } catch (error) {
      serviceError(error);
    }
  }

  async getCustomers(): Promise<CustomerInterface[]> {
    try {
      const customers = await Customer.findAll();
      return customers.map((customerObj) => customerObj.get({ plain: true }));
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
      "customerType": "company",
      "cuit": 33693450239,
      "companyName": "Tech Solutions S.A.",
      "email": "info@techsolutions.com",
      "address": "456 Industrial Ave, Buenos Aires",
      "phoneNumber": "011-4567-8900",
      "enableDebt": false,
      "userId": "57ee18e7-1109-412a-b1b3-711b3832b87c"
    }

    CLIENTE PERSONA

    {
      "customerType": "person",
      "dni": 33693450,
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@example.com",
      "address": "Av. Siempre Viva 742, Springfield",
      "phoneNumber": "011-1234-5678",
      "dateOfBirth": "1990-05-10",
      "enableDebt": true,
      "userId": "57ee18e7-1109-412a-b1b3-711b3832b87c"
    } 

*/
