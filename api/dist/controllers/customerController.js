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
const CustomerServices_1 = __importDefault(require("../services/CustomerServices"));
class CustomerController {
    getCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId, docTipo, docNro, name, id } = req.query;
                if (!companyId) {
                    res.status(400).json({ message: "CompanyId are required" });
                    return;
                }
                const customer = yield CustomerServices_1.default.getCustomers({
                    companyId,
                    docTipo,
                    docNro,
                    name,
                    id,
                });
                if (!customer) {
                    res.status(404).json({ message: "Customer not found" });
                    return;
                }
                res.status(200).json({ success: true, customer });
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    postCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.params;
                if (!companyId) {
                    res.status(400).json({ message: "Company id is required" });
                }
                const newCustomer = yield CustomerServices_1.default.postCustomer(req.body, companyId);
                if (typeof newCustomer === "string") {
                    res.status(400).json({ message: newCustomer });
                    return;
                }
                res.status(201).json(newCustomer);
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    putCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateResult = yield CustomerServices_1.default.putCustomer(id, req.body);
                if (updateResult === true) {
                    res.status(200).json({ success: true });
                }
                else {
                    res.status(404).json({ message: updateResult });
                }
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
    deleteCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleteResult = yield CustomerServices_1.default.deleteCustomer(id);
                if (deleteResult === true) {
                    res.status(204).json({ success: true });
                }
                else {
                    res.status(404).json({ message: deleteResult });
                }
            }
            catch (error) {
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
}
exports.default = new CustomerController();
