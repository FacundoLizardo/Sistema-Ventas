import { Request } from "express";
import { issueInvoice } from "./afipServices/issueInvoice";
import { generateTicket } from "./afipServices/generateTicket";

class AfipServices {
  async generateTicket({ req }: { req: Request }) {
    return await generateTicket({ req });
  }

  async issueInvoice({ req }: { req: Request }) {
    return await issueInvoice({ req });
  }

  async electronicCreditInvoices() {
    return console.log("electronicCreditInvoice");
  }

  async creditNote() {
    return console.log("creditNote");
  }
}

export default new AfipServices();


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