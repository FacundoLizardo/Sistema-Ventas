"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
class CustomerService {
    async getCustomers({ companyId, docTipo, docNro, name, id, }) {
        try {
            const whereClause = { companyId };
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
                const customer = await db_1.Customer.findOne({
                    where: whereClause,
                });
                return customer ? customer.get({ plain: true }) : null;
            }
            else {
                const customers = await db_1.Customer.findAll({
                    where: whereClause,
                });
                return customers
                    ? customers.map((customerObj) => customerObj.get({ plain: true }))
                    : [];
            }
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async getCustomerByDocument(data) {
        try {
            const { docNro, docTipo } = data;
            const customer = await db_1.Customer.findOne({
                where: {
                    docTipo: docTipo,
                    docNro: docNro,
                },
            });
            return customer
                ? customer.get({ plain: true })
                : null;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postCustomer(data, companyId) {
        try {
            const [customer, created] = await db_1.Customer.findOrCreate({
                where: { docNro: data.docNro, docTipo: data.docTipo },
                defaults: {
                    ...data,
                    companyId,
                },
            });
            if (created) {
                return customer.get({ plain: true });
            }
            else {
                return "Customer not created because it already exists or something is wrong, please try again.";
            }
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async putCustomer(dni, data) {
        try {
            const existingCustomer = await db_1.Customer.findOne({ where: { dni } });
            if (!existingCustomer) {
                return `The customer with dni: ${dni} does not exist`;
            }
            await existingCustomer.update(data);
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async deleteCustomer(dni) {
        try {
            const deletedCount = await db_1.Customer.destroy({ where: { dni } });
            if (deletedCount === 0) {
                throw new Error("Customer not found");
            }
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new CustomerService();
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
