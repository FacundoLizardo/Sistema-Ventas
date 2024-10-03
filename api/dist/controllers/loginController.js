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
const LoginService_1 = __importDefault(require("../services/LoginService"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = (yield LoginService_1.default.authenticate(email, password));
                if (!user) {
                    res
                        .status(401)
                        .json({ success: false, message: "Email o contraseña incorrectos." });
                    return;
                }
                const token = LoginService_1.default.generateToken(user);
                res.status(200).json({
                    success: true,
                    dataUser: {
                        userId: user.id,
                        email: user.email,
                        companyId: user.companyId,
                        branchId: user.branchId,
                        role: user.role,
                        token,
                    },
                });
            }
            catch (error) {
                console.error("Error durante la autenticación:", error);
                if (!res.headersSent) {
                    res.status(500).json({ error: "Error en la autenticación." });
                }
            }
        });
    }
    logout(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("token");
                res.status(200).json({ success: true, message: "Logout successful." });
            }
            catch (error) {
                console.error("Unexpected error during logout:", error);
                res
                    .status(500)
                    .json({ success: false, message: "An unexpected error occurred." });
            }
        });
    }
}
exports.default = new LoginController();
