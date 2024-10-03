"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const UserServices_1 = __importDefault(require("../services/UserServices"));
class UserController {
    async getUser(req, res) {
        try {
            const id = req.query.userId;
            if (!id) {
                res.status(404).json({ message: "User id is required" });
            }
            const user = await UserServices_1.default.getUser(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json({ success: true, user });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async getUsers(req, res) {
        try {
            const { companyId } = req.params;
            const users = await UserServices_1.default.getUsers(companyId);
            if (!users.length) {
                res.status(404).json({ message: "No users found" });
                return;
            }
            res.status(200).json({ success: true, users });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async postUser(req, res) {
        try {
            const companyId = req.params.companyId;
            if (!companyId) {
                res.status(404).json({ message: "Company id is required" });
            }
            const newUser = await UserServices_1.default.postUser(req.body, companyId);
            if (typeof newUser === "string") {
                res.status(400).json({ message: newUser });
                return;
            }
            res.status(201).json(newUser);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async putUser(req, res) {
        try {
            const { userId } = req.query;
            if (!userId) {
                res.status(400).json({ message: "User id is required" });
            }
            const updateResult = await UserServices_1.default.putUser(userId, req.body);
            if (!updateResult) {
                res.status(404).json({ message: updateResult });
            }
            else {
                res.status(200).json({ success: true, newUser: updateResult });
            }
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: "User id is required" });
            }
            const deleteUser = await UserServices_1.default.deleteUser(id);
            if (deleteUser !== true) {
                res.status(400).json({ message: "User not deleted." });
            }
            else {
                res.status(204).json({ success: true });
            }
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    }
}
exports.default = new UserController();
