"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Operation extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Operation.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        products: {
            type: sequelize_1.DataTypes.JSONB,
            allowNull: true,
            defaultValue: [],
        },
        amount: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        discount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        extraCharge: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        debtAmount: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
                isFloat: {
                    msg: "The debt should be a decimal number.",
                },
                min: {
                    args: [0],
                    msg: "The amount of debt should be equal or higher than 0.",
                },
            },
        },
        branchId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        paymentType: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "cash",
            validate: {
                isIn: [["credit", "debit", "cash", "mercadoPago", "transfer"]],
            },
        },
        invoiceNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
            validate: {
                isIn: [["completed", "pending", "cancelled", "failed", "voided"]],
            },
        },
        isdelivery: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        deliveryAddress: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        customer: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        comments: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        invoiceLink: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        cbteTipo: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        user: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Operation",
        timestamps: true,
    });
    return Operation;
};
