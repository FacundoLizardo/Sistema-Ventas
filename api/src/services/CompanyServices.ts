import { Company, User } from "../db";
import { CompanyInterface } from "../models/company";
import { serviceError } from "../utils/serviceError";

class CompanyServices {
  async getCompanyById(id: string) {
    try {
      return await Company.findByPk(id, {
        include: [
          {
            model: User,
            as: "users",
          },
        ],
      });
    } catch (error) {
      serviceError(error);
    }
  }

  async getAllCompanies() {
    try {
      const companies = await Company.findAll();

      return companies.length > 0
        ? companies.map((company) => company.get({ plain: true }))
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postCompany(data: Partial<CompanyInterface>) {
    try {
      const [company, created] = await Company.findOrCreate({
        where: { name: data.name },
        defaults: data,
      });
      return created ? company : "Company already exists or creation failed.";
    } catch (error) {
      serviceError(error);
    }
  }

  async putCompany(id: string, data: CompanyInterface) {
    try {
      const existingCompany = await Company.findOne({ where: { id } });
      if (!existingCompany) {
        throw new Error(`Company with id ${id} does not exist.`);
      }
      return await Company.update(data, { where: { id } });
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteCompany(id: string) {
    try {
      const deletedCount = await Company.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new Error(`Company with id ${id} does not exist.`);
      }
      return deletedCount;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new CompanyServices();

//---------- TESTS ----------

/* 
    {
      "name": "GPI 360",
      "address": "Calle 123",
      "country": "Argentina",
      "phoneNumbers": ["+1-234-567-8900", "3442644665"],
      "cuit": "20-12345678-9",
      "isActive": true
    }
 */
