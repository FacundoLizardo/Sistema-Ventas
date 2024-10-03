"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class CashRegister extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    CashRegister.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        initialAmount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        finalAmount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        income: {
            type: sequelize_1.DataTypes.JSONB,
            allowNull: true,
            defaultValue: {
                amount: 0,
                details: "",
            },
        },
        egress: {
            type: sequelize_1.DataTypes.JSONB,
            allowNull: true,
            defaultValue: {
                amount: 0,
                details: "",
            },
        },
        totalCashRegister: {
            type: sequelize_1.DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        },
        comments: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "",
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "CashRegister",
        timestamps: true,
    });
    return CashRegister;
};
