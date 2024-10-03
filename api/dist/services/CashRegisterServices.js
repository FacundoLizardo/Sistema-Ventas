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
class CashRegisterServices {
    getCashRegister(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashRegister = yield db_1.CashRegister.findByPk(id);
                return cashRegister
                    ? cashRegister.get({ plain: true })
                    : null;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    getCashRegisters() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashRegisters = yield db_1.CashRegister.findAll();
                return cashRegisters
                    ? cashRegisters.map((cashRegisterObj) => cashRegisterObj.get({ plain: true }))
                    : [];
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
    postCashRegister(data) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const newCashRegister = yield db_1.CashRegister.create({
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
        });
    }
    putCashRegister(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, initialAmount, finalAmount, income, egress, totalCashRegister, comments, } = data;
            try {
                const existingCashRegister = yield db_1.CashRegister.findOne({
                    where: { id },
                });
                if (!existingCashRegister) {
                    return `The cash register with id ${id} does not exist`;
                }
                yield existingCashRegister.update({
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
        });
    }
    deleteCashRegister(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield db_1.CashRegister.destroy({ where: { id } });
                if (deletedCount === 0) {
                    throw new Error("Cash register not found");
                }
                return true;
            }
            catch (error) {
                (0, serviceError_1.serviceError)(error);
            }
        });
    }
}
exports.default = new CashRegisterServices();
