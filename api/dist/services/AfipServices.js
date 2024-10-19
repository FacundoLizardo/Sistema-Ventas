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
Object.defineProperty(exports, "__esModule", { value: true });
const issueInvoice_1 = require("./afipServices/issueInvoice");
const generateTicket_1 = require("./afipServices/generateTicket");
class AfipServices {
    generateTicket(_a) {
        return __awaiter(this, arguments, void 0, function* ({ req }) {
            return yield (0, generateTicket_1.generateTicket)({ req });
        });
    }
    issueInvoice(_a) {
        return __awaiter(this, arguments, void 0, function* ({ req }) {
            return yield (0, issueInvoice_1.issueInvoice)({ req });
        });
    }
    electronicCreditInvoices() {
        return __awaiter(this, void 0, void 0, function* () {
            return console.log("electronicCreditInvoice");
        });
    }
    creditNote() {
        return __awaiter(this, void 0, void 0, function* () {
            return console.log("creditNote");
        });
    }
}
exports.default = new AfipServices();
/*
    {
      "products": [
        {
          "id": "5ede55fa-7039-45a1-b9d4-28552c634a6a",
          "name": "Vino tinto",
          "finalPrice": 100
        },
        {
          "id": "5ede55fa-7039-45a1-b9d4-28552c634a6a",
          "name": "Vino tinto",
          "finalPrice": 100
        }
      ],
      "discount": 10,
      "cbteTipo": 1,
      "ptoVta": 1,
      "concepto": 1,
      "importeGravado": 200,
      "importeExentoIva": 0,
      "docNro": 33693450239,
      "docTipo": 80,
      "iva": 21,
      "outputDir": "C:/Users/lucas/Downloads",
      "paymentType": "cash",
      "isdelivery": false,
      "deliveryAddress": "Calle pepito",
      "comments": "",
      "branchId": "",
      "userId": "57ee18e7-1109-412a-b1b3-711b3832b87c"
    }
*/ 
