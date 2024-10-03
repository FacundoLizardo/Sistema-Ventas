"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    id;
    firstName;
    lastName;
    email;
    password;
    address;
    phoneNumber;
    cuit;
    enabled;
    role;
    createdAt;
    updatedAt;
}
exports.default = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [0, 50],
            },
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
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
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        cuit: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 50],
            },
        },
        enabled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [["SUPER_ADMIN", "OWNER", "ADMIN", "BASIC"]],
                    msg: "Role must be one of SUPER_ADMIN, ADMIN, DEVELOPER, BASIC",
                },
            },
        },
    }, {
        sequelize,
        modelName: "User",
        timestamps: true,
    });
    return User;
};
/*
    Roles: ["SUPER_ADMIN", "OWNER", "ADMIN", "BASIC"]
    SUPER_ADMIN: tiene acceso a todos los recursos
    OWNER: tiene acceso a todos los recursos MENOS al dashboard de SUPER_ADMIN
    ADMIN: tiene acceso a los recursos de usuarios y de sucursales
    BASIC: tiene acceso solo a los recursos de sucursales
*/
