"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const CompanyServices_1 = __importDefault(require("../services/CompanyServices"));
class CompanyController {
    async getCompany(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(404).json({ message: "Company id is required" });
            }
            const company = await CompanyServices_1.default.getCompanyById(id);
            if (!company) {
                res.status(404).json({ message: "Company not found" });
                return;
            }
            res.status(200).json({ success: true, company });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 404);
        }
    }
    async getCompanies(_req, res) {
        try {
            const companies = await CompanyServices_1.default.getAllCompanies();
            if (!companies) {
                res.status(404).json({ message: "Companies not found" });
                return;
            }
            res.status(200).json({ success: true, companies });
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 404);
        }
    }
    async postCompany(req, res) {
        const data = req.body;
        try {
            if (!data.razonSocial) {
                res.status(400).json({ message: "Missing information." });
                return;
            }
            const newCompany = await CompanyServices_1.default.postCompany(data);
            if (typeof newCompany === "string") {
                res.status(400).json({ message: newCompany });
                return;
            }
            res.status(201).json(newCompany);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 400);
        }
    }
    async putCompany(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            if (!id)
                throw new Error("Company ID is required.");
            const updatedCompany = await CompanyServices_1.default.putCompany(id, data);
            res.status(200).json(updatedCompany);
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 400);
        }
    }
    async deleteCompany(req, res) {
        const { id } = req.params;
        try {
            if (!id)
                throw new Error("Company ID is required.");
            const deletedCount = await CompanyServices_1.default.deleteCompany(id);
            if (deletedCount === 0)
                throw new Error("Company not found.");
            res.status(204).send();
        }
        catch (error) {
            (0, controllerError_1.controllerError)(res, error, 400);
        }
    }
}
exports.default = new CompanyController();
