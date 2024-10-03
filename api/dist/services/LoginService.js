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
exports.LoginService = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
class LoginService {
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield db_1.User.findOne({
                where: { email },
            }));
            if (!user) {
                console.error(`User with the email: ${email} not found.`);
                return null;
            }
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword) {
                console.error("Invalid password.");
                return null;
            }
            return user;
        });
    }
    generateToken(user) {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined.");
        }
        return jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, JWT_SECRET, { expiresIn: "1h" });
    }
}
exports.LoginService = LoginService;
exports.default = new LoginService();
//---------- TESTS ----------
/*
    {
      "email": "ltamburlini@gmail.com",
      "password": "lucas1234"
    }
*/
