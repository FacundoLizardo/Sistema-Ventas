import { accessToken } from "../accessToken";
import { getCompaniesService } from "./getCompaniesService";
import { getCompanyService } from "./getCompanyService";

export interface ICompany {
  id: string;
  country?: string;
  phoneNumbers?: string;
  isActive: boolean;

  // Campos adicionales
  cuit: string;
  razonSocial: string; // RAZON_SOCIAL
  domicilioFiscal: string; // DOMICILIO_FISCAL
  inicioActividad: string; // INICIO_ACTIVIDAD
  regimenTributario: string; // REGIMEN_TRIBUTARIO
  iibb: string; // IIBB
}

class CompaniesServices {
  static async getToken() {
    try {
      const token = accessToken();
      return token;
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const token = await this.getToken();

      const response = await getCompaniesService({ token });
      return response;
    } catch (error) {
      console.error("Error getting companies:", error);
      throw error;
    }
  }

  static async get(companyId: string) {
    try {
      const token = await this.getToken();

      const response = await getCompanyService({ token, companyId });
      return response;
    } catch (error) {
      console.error("Error getting company:", error);
      throw error;
    }
  }
}

export default CompaniesServices;
