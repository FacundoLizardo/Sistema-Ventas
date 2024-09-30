import { accessToken } from "../accessToken";
import { AfipProducts } from "../products/ProductsServices";
import { postAfipService } from "./postAfipService";

export interface IAfip {
  products: AfipProducts[];
  discount?: number;

  // Client
  docTipo: string;
  docNro: string;

  // Invoice
  cbteTipo: number;
  concepto: number;
  paymentType: "credit" | "debit" | "cash" | "mercadoPago" | "transfer";
  importeGravado: number;
  importeExentoIva: number;
  iva: number;

  // Company
  outputDir?: string;
  ptoVta: number;
  razonSocial: string;
  iibb: string;
  domicilioFiscal: string;
  inicioActividad: string;
  regimenTributario: string;

  // Additional Info
  isdelivery?: boolean;
  deliveryAddress?: string;
  comments?: string;

  // User
  branchId: string;
  userId: string;
}

class AfipServices {
  static async getToken() {
    try {
      const token = accessToken();
      return token;
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }

  static async post({
    companyId,
    params,
  }: {
    companyId: string;
    params: IAfip;
  }) {
    try {
      const token = await this.getToken();
      return await postAfipService({ token, companyId, params });
    } catch (error) {
      console.error("Error getting branches:", error);
      throw error;
    }
  }
}

export default AfipServices;
