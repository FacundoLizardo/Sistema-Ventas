"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Company extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Company.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        phoneNumbers: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: true,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        cuit: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        razonSocial: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        domicilioFiscal: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        inicioActividad: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        regimenTributario: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        iibb: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Company",
        timestamps: true,
    });
    return Company;
};
