"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw new Error("There was a problem hashing the password.");
    }
};
exports.hashPassword = hashPassword;
