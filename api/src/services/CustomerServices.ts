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

  async getCustomerWithDNI(dni: string): Promise<CustomerInterface | null> {
    try {
      const dniParams = dni.toString()
      console.log("dni", dniParams);
      const customer = await Customer.findOne({ where: { dni: dniParams } });

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
      const [customer, created] = await Customer.findOrCreate({
        where: { dni: data.dni },
        defaults: {
          ...data,
          companyId,
        },
      });

      if (created) {
        return customer.get({ plain: true }) as CustomerInterface;
      } else {
        return "Customer not created because it already exists or something is wrong, please try again";
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
    {
        "dni": "123456789",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "address": "123 Main Street",
        "phoneNumber": "555-1234",
        "dateOfBirth": "1990-01-01",
        "enableDebt": false
    } 
*/
