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
exports.default = seedDatabase;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingCompany = yield db_1.Company.findOne({
                where: { cuit: "20331112225" },
            });
            if (!existingCompany) {
                const company = yield db_1.Company.create({
                    razonSocial: "GPI 360 S.A.",
                    domicilioFiscal: "Calle de Prueba 1234, CABA",
                    inicioActividad: "20010101",
                    regimenTributario: "Responsable Inscripto",
                    iibb: "123456789",
                    country: "Argentina",
                    phoneNumbers: ["3442644674"],
                    cuit: "20331112225",
                    isActive: true,
                });
                const existingUser = yield db_1.User.findOne({
                    where: { email: "test@gmail.com" },
                });
                if (!existingUser) {
                    const hashedPassword = yield bcrypt_1.default.hash("123456", saltRounds);
                    const user = yield db_1.User.create({
                        firstName: "Test",
                        lastName: "Test",
                        email: "test@gmail.com",
                        password: hashedPassword,
                        address: "123 Main St",
                        phoneNumber: "1234567890",
                        cuit: "20123456789",
                        enabled: true,
                        role: "SUPER_ADMIN",
                        companyId: company.dataValues.id,
                    });
                    const existingBranch = yield db_1.Branch.findOne({
                        where: { afipId: "6677889900" },
                    });
                    if (!existingBranch) {
                        yield db_1.Branch.create({
                            afipId: "6677889900",
                            ptoVta: 2,
                            name: "Sucursal Norte",
                            location: "Zona Rural",
                            isStorage: true,
                            enable: false,
                            manager: [user.dataValues.id],
                            hours: "8:00 AM - 4:00 PM",
                            phoneNumber: "+6677889900",
                            companyId: company.dataValues.id,
                        });
                    }
                    const existingCustomer = yield db_1.Customer.findOne({
                        where: { docNro: "33693450239" },
                    });
                    if (!existingCustomer) {
                        yield db_1.Customer.create({
                            customerType: "company",
                            docTipo: "80",
                            docNro: "33693450239",
                            companyName: "Tech Solution",
                            email: "info@techsolutionds.com",
                            address: "456 Industrial Ave, Buenos Aires",
                            phoneNumber: "01145678900",
                            enableDebt: false,
                            userId: user.dataValues.id,
                            companyId: company.dataValues.id,
                        });
                    }
                }
            }
        }
        catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    });
}
