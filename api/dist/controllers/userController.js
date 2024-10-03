"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const UserServices_1 = __importDefault(require("../services/UserServices"));
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.userId;
                if (!id) {
                    res.status(404).json({ message: "User id is required" });
                }
                const user = yield UserServices_1.default.getUser(id);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json({ success: true, user });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.params;
                const users = yield UserServices_1.default.getUsers(companyId);
                if (!users.length) {
                    res.status(404).json({ message: "No users found" });
                    return;
                }
                res.status(200).json({ success: true, users });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    postUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyId = req.params.companyId;
                if (!companyId) {
                    res.status(404).json({ message: "Company id is required" });
                }
                const newUser = yield UserServices_1.default.postUser(req.body, companyId);
                if (typeof newUser === "string") {
                    res.status(400).json({ message: newUser });
                    return;
                }
                res.status(201).json(newUser);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    putUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.query;
                if (!userId) {
                    res.status(400).json({ message: "User id is required" });
                }
                const updateResult = yield UserServices_1.default.putUser(userId, req.body);
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
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: "User id is required" });
                }
                const deleteUser = yield UserServices_1.default.deleteUser(id);
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
        });
    }
}
exports.default = new UserController();
