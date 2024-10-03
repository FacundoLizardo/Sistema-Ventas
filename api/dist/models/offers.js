"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const percentajeValidator_1 = require("../utils/percentajeValidator");
class Offer extends sequelize_1.Model {
    id;
    products;
    imageUrl;
    discountPercentage;
    price;
    createdAt;
    updatedAt;
}
exports.default = (sequelize) => {
    Offer.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        products: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID),
            allowNull: false,
            defaultValue: [],
        },
        imageUrl: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        discountPercentage: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isFloat: {
                    msg: "The discount should be a decimal number.",
                },
                customValidation(value) {
                    (0, percentajeValidator_1.validatePercentage)(value, 0, 100, "The discount");
                },
            },
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isFloat: {
                    msg: "The price should be a decimal number.",
                },
                min: {
                    args: [0],
                    msg: "The price should be equal or higher than 0.",
                },
            },
        },
    }, {
        sequelize,
        modelName: "Offer",
        timestamps: true,
    });
    return Offer;
};
