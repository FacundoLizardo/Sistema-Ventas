import { Company } from "../db";
import { CompanyInterface } from "../models/company";
import { serviceError } from "../utils/serviceError";

class CompanyServices {
  async getCompanyById(id: string) {
    try {
      return await Company.findByPk(id);
    } catch (error) {
      serviceError(error);
    }
  }

  async getAllCompanies() {
    try {
      return await Company.findAll();
    } catch (error) {
      serviceError(error);
    }
  }

  async postCompany(data: Partial<CompanyInterface>) {
    try {
      const [company, created] = await Company.findOrCreate({
        where: { name: data.name }, // Assuming 'name' is a unique field
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
        "afipId": "1234567289",
        "ptoVta": 213221,
        "name": "Sucursal Principal",
        "location": "Ciudad Principal",
        "isStorage": false,
        "enable": true,
        "manager": [
            "c1d74da3-634a-4d2d-a5a1-72e68d20f0d7",
            "e3b55df8-871c-4e0b-bf61-9f3a19fd0e99"
        ],
        "hours": "9:00 AM - 6:00 PM",
        "phoneNumber": "+1234567890"
    }
 */
