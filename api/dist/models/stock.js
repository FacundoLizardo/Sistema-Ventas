"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class Stock extends sequelize_2.Model {
    id;
    quantity;
    productId;
    branchId;
    createdAt;
    updatedAt;
}
exports.default = (sequelize) => {
    Stock.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        branchId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
    }, {
        modelName: "Stock",
        sequelize,
    });
};
