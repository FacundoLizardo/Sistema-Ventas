"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Customer extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Customer.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        customerType: {
            type: sequelize_1.DataTypes.ENUM("person", "company"),
            allowNull: false,
        },
        docTipo: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        docNro: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        companyName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 100],
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        dateOfBirth: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
            validate: {
                isValidDate(value) {
                    if (value && isNaN(Date.parse(value))) {
                        throw new Error("Date of birth is not valid.");
                    }
                },
            },
        },
        enableDebt: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: "Customer",
        timestamps: true,
    });
    return Customer;
};
