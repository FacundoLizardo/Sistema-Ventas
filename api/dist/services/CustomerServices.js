"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
class CustomerService {
    getCustomers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId, docTipo, docNro, name, id, }) {
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
                    const customer = yield db_1.Customer.findOne({
                        where: whereClause,
                    });
                    return customer ? customer.get({ plain: true }) : null;
                }
                else {
                    const customers = yield db_1.Customer.findAll({
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
        });
    }
    getCustomerByDocument(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { docNro, docTipo } = data;
                const customer = yield db_1.Customer.findOne({
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
        });
    }
    postCustomer(data, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [customer, created] = yield db_1.Customer.findOrCreate({
                    where: { docNro: data.docNro, docTipo: data.docTipo },
                    defaults: Object.assign(Object.assign({}, data), { companyId }),
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
        });
    }
    putCustomer(dni, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCustomer = yield db_1.Customer.findOne({ where: { dni } });
                if (!existingCustomer) {
                    return `The customer with dni: ${dni} does not exist`;
                }
                yield existingCustomer.update(data);
                return true;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    deleteCustomer(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield db_1.Customer.destroy({ where: { dni } });
                if (deletedCount === 0) {
                    throw new Error("Customer not found");
                }
                return true;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
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
