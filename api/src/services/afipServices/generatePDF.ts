require("dotenv").config();
import moment from "moment";
import path from "path";
import fs from "fs";
import Afip from "@afipsdk/afip.js";
import {
  CUIT,
  RAZON_SOCIAL,
  DOMICILIO_FISCAL,
  REGIMEN_TRIBUTARIO,
  IIBB,
  INICIO_ACTIVIDAD,
} from "../../config";
import { ProductInterface } from "../../models/product";

const afip = new Afip({ CUIT: CUIT });

type GeneratePDFProps = {
  voucherData: any;
  data: any;
  numeroFactura: number;
  urlQr: string;
  discount: number;
};

export const generatePDF = async ({
  voucherData,
  data,
  numeroFactura,
  urlQr,
  discount,
}: GeneratePDFProps) => {
  try {
    const htmlPath =
      data.CbteTipo === 1
        ? path.join(__dirname, "facturaA.html")
        : data.CbteTipo === 6
        ? path.join(__dirname, "facturaB.html")
        : data.CbteTipo === 11
        ? path.join(__dirname, "facturaC.html")
        : "";

    let html = fs.readFileSync(htmlPath, "utf8");

    const generateProductRows = (products: ProductInterface[]) => {
      const productMap = new Map();

      products.forEach((product) => {
        const { id, name, finalPrice } = product;
        if (!productMap.has(id)) {
          productMap.set(id, {
            description: name,
            quantity: 1,
            unitPrice: finalPrice,
            totalAmount: finalPrice,
          });
        } else {
          const existingProduct = productMap.get(id);
          productMap.set(id, {
            description: existingProduct.description,
            quantity: existingProduct.quantity + 1,
            unitPrice: existingProduct.unitPrice,
            totalAmount: existingProduct.totalAmount += finalPrice,
          });
        }
      });

      const tableHeader = `
          <tr>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Precio Unitario</th>
              <th>Importe Total</th>
          </tr>
      `;

      const tableRows = Array.from(productMap.values())
        .map(
          (product) => `
          <tr>
              <td>${product.quantity}</td>
              <td>${product.description}</td>
              <td>${product.unitPrice.toFixed(2)}</td>
              <td>${product.totalAmount.toFixed(2)}</td>
          </tr>
      `
        )
        .join("");

      return `${tableHeader}${tableRows}`;
    };

    let productRows = generateProductRows(data.products);
    let razonSocial = RAZON_SOCIAL;
    let domicilio = DOMICILIO_FISCAL;
    let cuit = CUIT;
    let regimenTributario = REGIMEN_TRIBUTARIO;
    let iibb = IIBB;
    let inicioActividad = INICIO_ACTIVIDAD;
    let fechaEmision = moment().format("DD-MM-YYYY");

    const conceptoFinal = () => {
      const conceptos: { [key: number]: string } = {
        1: "Productos",
        2: "Servicios",
        3: "Productos y Servicios",
      };
      return conceptos[data.Concepto] || "Concepto no definido";
    };

    let condicionIVA = "";
    switch (data.DocTipo) {
      case "80": // CUIT
        condicionIVA = "Responsable Inscripto";
        break;
      case "96": // CUIL
        condicionIVA = "Consumidor Final";
        break;
      // El resto
      default:
        condicionIVA = "";
        break;
    }

    const replacedHTML = html
      .replace("{{urlQr}}", urlQr || "QR no found")
      .replace("{{CAE}}", voucherData.CAE || "")
      .replace("{{Vencimiento}}", voucherData.CAEFchVto || "")
      .replace("{{razonSocial}}", razonSocial || "")
      .replace("{{domicilio}}", domicilio || "")
      .replace("{{cuit}}", cuit || "")
      .replace("{{regimenTributario}}", regimenTributario || "")
      .replace("{{iibb}}", iibb || "")
      .replace("{{inicioActividad}}", inicioActividad || "")
      .replace("{{productRows}}", productRows || "")
      .replace("{{ImpTotal}}", data.ImpTotal || "")
      .replace("{{cbteTipo}}", data.CbteTipo || "")
      .replace("{{ptoVta}}", data.PtoVta || "")
      .replace("{{numeroFactura}}", numeroFactura.toString() || "")
      .replace("{{concepto}}", conceptoFinal())
      .replace("{{condicionIVA}}", condicionIVA)
      .replace("{{fecha}}", fechaEmision)
      .replace("{{ImpIVA}}", data.ImpIVA)
      .replace("{{ImpNeto}}", data.ImpNeto)
      .replace("{{discount}}", discount.toFixed(2) || "")
      .replace("{{importeGravado}}", data.importeGravado)

    const options = {
      width: 8,
      marginLeft: 0.4,
      marginRight: 0.4,
      marginTop: 0.4,
      marginBottom: 0.4,
    };

    const pdfData = await afip.ElectronicBilling.createPDF({
      html: replacedHTML,
      file_name: "Voucher",
      options: options,
    });
    
    return pdfData

  } catch (error) {
    throw new Error(`An error occurred while generating the PDF: ${error}`);
  }
};
