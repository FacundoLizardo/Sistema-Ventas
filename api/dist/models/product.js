"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const percentajeValidator_1 = require("../utils/percentajeValidator");
class Product extends sequelize_1.Model {
    static isPositive(value) {
        if (value < 0) {
            throw new Error("The value must be a positive number.");
        }
    }
    static validateDiscount(value) {
        if (value < 0) {
            throw new Error("The discount must be a positive number.");
        }
        else if (value > 10000) {
            throw new Error("The discount must be less than 10000.");
        }
    }
}
exports.default = (sequelize) => {
    Product.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [0, 50],
            },
        },
        cost: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isPositive: Product.isPositive,
            },
        },
        finalPrice: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isPositive: Product.isPositive,
            },
        },
        discount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                customValidation(value) {
                    (0, percentajeValidator_1.validatePercentage)(value, 0, 100, "Profit Percentage");
                },
            },
        },
        profitPercentage: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isPositive: Product.validateDiscount,
            },
        },
        allowNegativeStock: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        trackStock: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        minimumStock: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        enabled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        notesDescription: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 255],
            },
        },
        taxes: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isPositive: Product.isPositive,
            },
        },
        barcode: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Product",
        timestamps: false,
    });
    return Product;
};
