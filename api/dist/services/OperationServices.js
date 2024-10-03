"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
const sequelize_1 = require("sequelize");
class OperationServices {
    async getOperations({ startDate, endDate, companyId, userId, }) {
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
            const operations = await db_1.Operation.findAll({
                where: whereCondition,
            });
            return operations.map((operation) => operation.get({ plain: true }));
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postOperation(data, companyId) {
        try {
            const operation = await db_1.Operation.create({
                defaults: {
                    ...data,
                    companyId,
                },
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
    }
    async putOperation(id, data) {
        try {
            const existingOperation = await db_1.Operation.findOne({ where: { id } });
            if (!existingOperation) {
                return `The operation with id: ${id} does not exist`;
            }
            await existingOperation.update(data);
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async deleteOperation(id) {
        try {
            const deletedCount = await db_1.Operation.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error(`Operation with id: ${id} not found`);
            }
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new OperationServices();
