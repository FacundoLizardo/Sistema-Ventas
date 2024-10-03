"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
class CashRegisterServices {
    async getCashRegister(id) {
        try {
            const cashRegister = await db_1.CashRegister.findByPk(id);
            return cashRegister
                ? cashRegister.get({ plain: true })
                : null;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async getCashRegisters() {
        try {
            const cashRegisters = await db_1.CashRegister.findAll();
            return cashRegisters
                ? cashRegisters.map((cashRegisterObj) => cashRegisterObj.get({ plain: true }))
                : [];
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postCashRegister(data) {
        const { userId, initialAmount, finalAmount, income, egress, totalCashRegister, comments, } = data;
        if (!userId) {
            return "User id must be provided";
        }
        if (!initialAmount) {
            return "Initial amount must be provided";
        }
        try {
            /*       const lastCashRegister = await CashRegister.findOne({
                    order: [["createdAt", "DESC"]],
                  }); */
            const newCashRegister = await db_1.CashRegister.create({
                userId,
                initialAmount,
                finalAmount,
                income,
                egress,
                totalCashRegister,
                comments,
            });
            return newCashRegister.get({ plain: true });
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async putCashRegister(id, data) {
        const { userId, initialAmount, finalAmount, income, egress, totalCashRegister, comments, } = data;
        try {
            const existingCashRegister = await db_1.CashRegister.findOne({
                where: { id },
            });
            if (!existingCashRegister) {
                return `The cash register with id ${id} does not exist`;
            }
            await existingCashRegister.update({
                userId,
                initialAmount,
                finalAmount,
                income,
                egress,
                totalCashRegister,
                comments,
            });
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async deleteCashRegister(id) {
        try {
            const deletedCount = await db_1.CashRegister.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error("Cash register not found");
            }
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new CashRegisterServices();
