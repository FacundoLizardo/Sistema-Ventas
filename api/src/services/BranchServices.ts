import { Branch } from "../db";
import { BranchCreationInterface, BranchInterface } from "../models/branch";
import { serviceError } from "../utils/serviceError";

class BranchServices {
  async getBranchById(id: string) {
    try {
      return await Branch.findByPk(id);
    } catch (error) {
      serviceError(error);
    }
  }

  async getBranches({ companyId }: { companyId: string }) {
    try {
      const branches = await Branch.findAll({
        where: { companyId },
      });
      return branches
        ? branches.map((productObj) => productObj.get({ plain: true }))
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postBranch(
    data: BranchCreationInterface,
    companyId: string
  ): Promise<string | BranchInterface> {
    try {
      const [product, created] = await Branch.findOrCreate({
        where: { name: data.name },
        defaults: {
          ...data,
          companyId,
        },
      });

      if (created) {
        return product.get({ plain: true }) as BranchInterface;
      } else {
        return "Branch not created because it already exists or something is wrong, please try again";
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async putBranch(id: string, data: BranchInterface) {
    try {
      const existingBranch = await Branch.findOne({ where: { id } });
      if (!existingBranch) {
        throw new Error(`Branch with id ${id} does not exist.`);
      }
      return await Branch.update(data, { where: { id } });
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteBranch(id: string) {
    try {
      const deletedCount = await Branch.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new Error(`Branch with id ${id} does not exist.`);
      }
      return deletedCount;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new BranchServices();

//---------- TESTS ----------

/* 
    {
    "afipId": "6677889900",
    "ptoVta": 1,
    "name": "Sucursal 1",
    "location": "Zona Rural",
    "isStorage": true,
    "enable": false,
    "manager": [
      "2a3846d0-60c4-4068-aab1-fe0f6499eef7"
    ],
    "hours": "8:00 AM - 4:00 PM",
    "phoneNumber": "+6677889900"
  }
 */
