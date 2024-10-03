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
const sequelize_1 = require("sequelize");
class OperationServices {
    getOperations(_a) {
        return __awaiter(this, arguments, void 0, function* ({ startDate, endDate, companyId, userId, }) {
            try {
                const whereCondition = {
                    companyId,
                };
                if (userId) {
                    whereCondition.userId = userId;
                }
                const startDateUTC = new Date(new Date(startDate).toUTCString());
                const endDateUTC = endDate
                    ? new Date(new Date(endDate).toUTCString())
                    : new Date(startDateUTC);
                endDateUTC.setUTCHours(23, 59, 59, 999);
                whereCondition.createdAt = {
                    [sequelize_1.Op.between]: [startDateUTC, endDateUTC],
                };
                const operations = yield db_1.Operation.findAll({
                    where: whereCondition,
                });
                return operations.map((operation) => operation.get({ plain: true }));
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    postOperation(data, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const operation = yield db_1.Operation.create({
                    defaults: Object.assign(Object.assign({}, data), { companyId }),
                });
                if (operation) {
                    return operation.get({ plain: true });
                }
                else {
                    return "Operation not created because it already exists or something went wrong, please try again";
                }
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    putOperation(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingOperation = yield db_1.Operation.findOne({ where: { id } });
                if (!existingOperation) {
                    return `The operation with id: ${id} does not exist`;
                }
                yield existingOperation.update(data);
                return true;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    deleteOperation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield db_1.Operation.destroy({ where: { id } });
                if (deletedCount === 0) {
                    throw new Error(`Operation with id: ${id} not found`);
                }
                return true;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
}
exports.default = new OperationServices();
