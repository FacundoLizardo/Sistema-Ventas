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
const AfipServices_1 = __importDefault(require("../services/AfipServices"));
class AfipController {
    constructor() {
        this.postAfip = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { cbteTipo } = req.body;
            try {
                let afipInvoice;
                if (cbteTipo === 0) {
                    afipInvoice = yield AfipServices_1.default.generateTicket({ req });
                }
                else {
                    afipInvoice = yield AfipServices_1.default.issueInvoice({ req });
                }
                res.status(200).json({ success: true, afipInvoice });
            }
            catch (error) {
                console.error("Error in postAfip:", error);
                (0, controllerError_1.controllerError)(res, error, 500);
            }
        });
    }
}
exports.default = new AfipController();
