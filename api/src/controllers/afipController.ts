import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import afipService from "../services/AfipServices";

class AfipController {
  postAfip = async (req: Request, res: Response) => {
    const { cbteTipo } = req.body;

    try {
      let afipInvoice;

      if (cbteTipo === 0) {
        afipInvoice = await afipService.generateTicket({ req });
      } else  {
        afipInvoice = await afipService.issueInvoice({ req });
      }

      res.status(200).json({ success: true, afipInvoice });
    } catch (error) {
      console.error("Error in postAfip:", error);
      controllerError(res, error, 500);
    }
  };
}

export default new AfipController();
