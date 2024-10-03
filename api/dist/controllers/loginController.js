"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginService_1 = __importDefault(require("../services/LoginService"));
class LoginController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = (await LoginService_1.default.authenticate(email, password));
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
    }
    async logout(_req, res) {
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
    }
}
exports.default = new LoginController();
