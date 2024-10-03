"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
class BranchServices {
    async getBranchById(id) {
        try {
            return await db_1.Branch.findByPk(id);
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async getBranches({ companyId }) {
        try {
            const branches = await db_1.Branch.findAll({
                where: { companyId },
            });
            return branches
                ? branches.map((productObj) => productObj.get({ plain: true }))
                : [];
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postBranch(data, companyId) {
        try {
            const [product, created] = await db_1.Branch.findOrCreate({
                where: { name: data.name },
                defaults: {
                    ...data,
                    companyId,
                },
            });
            if (created) {
                return product.get({ plain: true });
            }
            else {
                return "Branch not created because it already exists or something is wrong, please try again";
            }
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async putBranch(id, data) {
        try {
            const existingBranch = await db_1.Branch.findOne({ where: { id } });
            if (!existingBranch) {
                throw new Error(`Branch with id ${id} does not exist.`);
            }
            return await db_1.Branch.update(data, { where: { id } });
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async deleteBranch(id) {
        try {
            const deletedCount = await db_1.Branch.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error(`Branch with id ${id} does not exist.`);
            }
            return deletedCount;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new BranchServices();
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
