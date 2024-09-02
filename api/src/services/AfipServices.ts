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
