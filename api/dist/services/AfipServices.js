"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const issueInvoice_1 = require("./afipServices/issueInvoice");
const generateTicket_1 = require("./afipServices/generateTicket");
class AfipServices {
    async generateTicket({ req }) {
        return await (0, generateTicket_1.generateTicket)({ req });
    }
    async issueInvoice({ req }) {
        return await (0, issueInvoice_1.issueInvoice)({ req });
    }
    async electronicCreditInvoices() {
        return console.log("electronicCreditInvoice");
    }
    async creditNote() {
        return console.log("creditNote");
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
