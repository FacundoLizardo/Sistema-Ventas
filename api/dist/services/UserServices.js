"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const serviceError_1 = require("../utils/serviceError");
const hashPassword_1 = require("../utils/hashPassword");
class UserServices {
    async getUser(id) {
        try {
            const user = await db_1.User.findByPk(id, {
                include: [{ model: db_1.Branch, as: "branch" }],
            });
            if (!user) {
                console.warn(`User not found with ID: ${id}`);
            }
            return user ? user.get({ plain: true }) : null;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
            return null; // Retorna null en caso de error
        }
    }
    async getUsers(companyId) {
        try {
            const users = await db_1.User.findAll({ where: { companyId } });
            return users ? users.map((userObj) => userObj.get({ plain: true })) : [];
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async postUser(data, companyId) {
        try {
            const password = await (0, hashPassword_1.hashPassword)(data.password);
            const [user, created] = await db_1.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    ...data,
                    password,
                    companyId,
                },
            });
            if (created) {
                return user.get({ plain: true });
            }
            else {
                return "User not created because it already exists or something went wrong, please try again";
            }
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async putUser(id, data) {
        try {
            const existingUser = await db_1.User.findOne({ where: { id } });
            if (!existingUser) {
                throw new Error(`The user with id: ${id} does not exist`);
            }
            if (data.password) {
                data.password = await (0, hashPassword_1.hashPassword)(data.password);
            }
            const newUser = await existingUser.update(data);
            return newUser;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
    async deleteUser(id) {
        try {
            const deletedCount = await db_1.User.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error("User not found");
            }
            return true;
        }
        catch (error) {
            (0, serviceError_1.serviceError)(error);
        }
    }
}
exports.default = new UserServices();
//---------- TESTS ----------
/*
    {
      "firstName": "Lucas",
      "lastName": "Tamburlini",
      "email": "ltamburlini@gmail.com",
      "password": "lucas1234",
      "address": "123 Main St",
      "phoneNumber": "123-456-7890",
      "cuit": "20-12345678-9",
      "enabled": true,
      "role": "SUPER_ADMIN"
    }

    {
      "firstName": "Test",
      "lastName": "User",
      "email": "testuser@example.com",
      "password": "testpassword",
      "address": "789 Oak St",
      "phoneNumber": "555-123-4567",
      "cuit": "20-11223344-5",
      "enabled": true,
      "role": "OWNER"
    }

*/
