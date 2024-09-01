import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError.js";
import afipService from "../services/AfipServices.js";

class AfipController {
  postAfip = async (req: Request, res: Response) => {
    const { cbteTipo } = req.body;

    try {
      let afipInvoice;

      if (cbteTipo === 0) {
        afipInvoice = await afipService.generateTicket({ req });
      } else {
        afipInvoice = await afipService.facturaA({ req });
      }

      /*  
      if (afipInvoice) {
        for (const product of products) {
          const { productId } = product;
          await editProductStockController({ productId });
        }
      } 
      */

      res.status(200).json({ success: true, afipInvoice });
    } catch (error) {
      console.error("Error in postAfip:", error);
      controllerError(res, error, 500);
    }
  };
}

export default new AfipController();