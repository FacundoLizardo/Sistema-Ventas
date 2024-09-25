import { WhereOptions } from "sequelize";
import { Customer } from "../db";
import {
  CustomerCreationInterface,
  CustomerInterface,
} from "../models/customer";
import { serviceError } from "../utils/serviceError";

class CustomerService {
  async getCustomers({
    companyId,
    docTipo,
    docNro,
    name,
    id,
  }: {
    companyId?: string;
    docTipo?: string;
    docNro?: string;
    name?: string;
    id?: string;
  }): Promise<CustomerInterface | CustomerInterface[] | null> {
    try {
      const whereClause: WhereOptions = { companyId };

      if (name) {
        whereClause.name = name;
      }

      if (docNro) {
        whereClause.docNro = docNro;
      }

      if (docTipo) {
        whereClause.docTipo = docTipo;
      }

      if (id) {
        whereClause.id = id;
      }

      if (companyId && docTipo && docNro) {
        const customer = await Customer.findOne({
          where: whereClause,
        });

        return customer ? customer.get({ plain: true }) : null;
      } else {
        const customers = await Customer.findAll({
          where: whereClause,
        });

        return customers
          ? customers.map((customerObj) => customerObj.get({ plain: true }))
          : [];
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async getCustomerByDocument(
    data: Partial<CustomerInterface>
  ): Promise<CustomerInterface | null> {
    try {
      const { docNro, docTipo } = data;

      const customer = await Customer.findOne({
        where: {
          docTipo: docTipo,
          docNro: docNro,
        },
      });

      return customer
        ? (customer.get({ plain: true }) as CustomerInterface)
        : null;
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
        where: { docNro: data.docNro, docTipo: data.docTipo },
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
      "docTipo": "80",
      "docNro": "33693450239",
      "companyName": "Tech",
      "email": "info@techsolutionds.com",
      "address": "456 Industrial Ave, Buendos Aires",
      "phoneNumber": "011-4567-8900",
      "enableDebt": false,
      "userId": "f127bab9-cb24-40f2-a6eb-63ef9180d828"
    }

    CLIENTE PERSONA

    {
      "customerType": "person",
      "docTipo": "96",
      "docNro": "35000222",
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
