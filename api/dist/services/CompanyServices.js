"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
class CompanyServices {
    async getCompanyById(id) {
        try {
            return await db_1.Company.findByPk(id);
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async getAllCompanies() {
        try {
            const companies = await db_1.Company.findAll();
            return companies.length > 0
                ? companies.map((company) => company.get({ plain: true }))
                : [];
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postCompany(data) {
        try {
            const [company, created] = await db_1.Company.findOrCreate({
                where: { razonSocial: data.razonSocial },
                defaults: data,
            });
            return created ? company : "Company already exists or creation failed.";
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async putCompany(id, data) {
        try {
            const existingCompany = await db_1.Company.findOne({ where: { id } });
            if (!existingCompany) {
                throw new Error(`Company with id ${id} does not exist.`);
            }
            return await db_1.Company.update(data, { where: { id } });
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async deleteCompany(id) {
        try {
            const deletedCount = await db_1.Company.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error(`Company with id ${id} does not exist.`);
            }
            return deletedCount;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
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
