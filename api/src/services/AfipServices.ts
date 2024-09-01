import { Request } from "express";
import { facturaA } from "./afipServices/facturaA";
import { generateTicket } from "./afipServices/generateTicket";

class AfipServices {
  async generateTicket({ req }: { req: Request }) {
    return await generateTicket({ req });
  }

  async facturaA({ req }: { req: Request }) {
    return await facturaA({ req });
  }
}

export default new AfipServices();
