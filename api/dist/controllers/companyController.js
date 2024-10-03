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
const CompanyServices_1 = __importDefault(require("../services/CompanyServices"));
class CompanyController {
    getCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(404).json({ message: "Company id is required" });
                }
                const company = yield CompanyServices_1.default.getCompanyById(id);
                if (!company) {
                    res.status(404).json({ message: "Company not found" });
                    return;
                }
                res.status(200).json({ success: true, company });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 404);
            }
        });
    }
    getCompanies(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield CompanyServices_1.default.getAllCompanies();
                if (!companies) {
                    res.status(404).json({ message: "Companies not found" });
                    return;
                }
                res.status(200).json({ success: true, companies });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 404);
            }
        });
    }
    postCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                if (!data.razonSocial) {
                    res.status(400).json({ message: "Missing information." });
                    return;
                }
                const newCompany = yield CompanyServices_1.default.postCompany(data);
                if (typeof newCompany === "string") {
                    res.status(400).json({ message: newCompany });
                    return;
                }
                res.status(201).json(newCompany);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 400);
            }
        });
    }
    putCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            try {
                if (!id)
                    throw new Error("Company ID is required.");
                const updatedCompany = yield CompanyServices_1.default.putCompany(id, data);
                res.status(200).json(updatedCompany);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 400);
            }
        });
    }
    deleteCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id)
                    throw new Error("Company ID is required.");
                const deletedCount = yield CompanyServices_1.default.deleteCompany(id);
                if (deletedCount === 0)
                    throw new Error("Company not found.");
                res.status(204).send();
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 400);
            }
        });
    }
}
exports.default = new CompanyController();
