"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerError_1 = require("../utils/controllerError");
const AfipServices_1 = __importDefault(require("../services/AfipServices"));
class AfipController {
    postAfip = async (req, res) => {
        const { cbteTipo } = req.body;
        try {
            let afipInvoice;
            if (cbteTipo === 0) {
                afipInvoice = await AfipServices_1.default.generateTicket({ req });
            }
            else {
                afipInvoice = await AfipServices_1.default.issueInvoice({ req });
            }
            res.status(200).json({ success: true, afipInvoice });
        }
        catch (error) {
            console.error("Error in postAfip:", error);
            (0, controllerError_1.controllerError)(res, error, 500);
        }
    };
}
exports.default = new AfipController();
