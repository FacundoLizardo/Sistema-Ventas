"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class SubCategory extends sequelize_1.Model {
    id;
    name;
    description;
    createdAt;
    updatedAt;
}
exports.default = (sequelize) => {
    SubCategory.init({
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
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 255],
            },
        },
    }, {
        sequelize,
        modelName: "SubCategory",
        timestamps: true,
    });
    return SubCategory;
};
