"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const urlValidator_1 = __importDefault(require("../utils/urlValidator"));
class Supplier extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Supplier.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        purchases: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID),
            allowNull: true,
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
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
        webUrl: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                isValidUrl: urlValidator_1.default,
            },
        },
        sellers: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: true,
        },
        frecuentProducts: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID),
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Supplier",
        timestamps: false,
    });
    return Supplier;
};
