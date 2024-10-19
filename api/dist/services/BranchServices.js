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
class BranchServices {
    getBranchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.Branch.findByPk(id);
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    getBranches(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId }) {
            try {
                const branches = yield db_1.Branch.findAll({
                    where: { companyId },
                });
                return branches
                    ? branches.map((productObj) => productObj.get({ plain: true }))
                    : [];
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    postBranch(data, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [product, created] = yield db_1.Branch.findOrCreate({
                    where: { name: data.name },
                    defaults: Object.assign(Object.assign({}, data), { companyId }),
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
        });
    }
    putBranch(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingBranch = yield db_1.Branch.findOne({ where: { id } });
                if (!existingBranch) {
                    throw new Error(`Branch with id ${id} does not exist.`);
                }
                return yield db_1.Branch.update(data, { where: { id } });
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    deleteBranch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield db_1.Branch.destroy({ where: { id } });
                if (deletedCount === 0) {
                    throw new Error(`Branch with id ${id} does not exist.`);
                }
                return deletedCount;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
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
