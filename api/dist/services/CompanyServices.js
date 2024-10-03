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
class CompanyServices {
    getCompanyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.Company.findByPk(id);
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    getAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield db_1.Company.findAll();
                return companies.length > 0
                    ? companies.map((company) => company.get({ plain: true }))
                    : [];
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    postCompany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [company, created] = yield db_1.Company.findOrCreate({
                    where: { razonSocial: data.razonSocial },
                    defaults: data,
                });
                return created ? company : "Company already exists or creation failed.";
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    putCompany(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCompany = yield db_1.Company.findOne({ where: { id } });
                if (!existingCompany) {
                    throw new Error(`Company with id ${id} does not exist.`);
                }
                return yield db_1.Company.update(data, { where: { id } });
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    deleteCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield db_1.Company.destroy({ where: { id } });
                if (deletedCount === 0) {
                    throw new Error(`Company with id ${id} does not exist.`);
                }
                return deletedCount;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
}
exports.default = new CompanyServices();
//---------- TESTS ----------
/*
    {
      "razonSocial": "GPI 360 S.A.",
      "domicilioFiscal": "Tucuman 1234, CABA",
      "inicioActividad": "20010101",
      "regimenTributario": "Responsable Inscripto",
      "iibb": "123456789",
      "country": "Argentina",
      "phoneNumbers": [
        "+1-234-567-8900",
        "3442644665"
      ],
      "cuit": "20-12345678-9",
      "isActive": true
    }
 */
