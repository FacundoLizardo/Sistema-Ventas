"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
require("dotenv").config();
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const afip_js_1 = __importDefault(require("@afipsdk/afip.js"));
const config_1 = require("../../config");
const afip = new afip_js_1.default({ CUIT: config_1.CUIT });
const generatePDF = async ({ voucherData, data, numeroFactura, urlQr, discount, }) => {
    try {
        const htmlPath = data.CbteTipo === 1
            ? path_1.default.join(__dirname, "facturaA.html")
            : data.CbteTipo === 6
                ? path_1.default.join(__dirname, "facturaB.html")
                : data.CbteTipo === 11
                    ? path_1.default.join(__dirname, "facturaC.html")
                    : "";
        let html = fs_1.default.readFileSync(htmlPath, "utf8");
        const generateProductRows = (products) => {
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
                }
                else {
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
                .map((product) => `
          <tr>
              <td>${product.quantity}</td>
              <td>${product.description}</td>
              <td>${product.unitPrice.toFixed(2)}</td>
              <td>${product.totalAmount.toFixed(2)}</td>
          </tr>
      `)
                .join("");
            return `${tableHeader}${tableRows}`;
        };
        let productRows = generateProductRows(data.products);
        let razonSocial = config_1.RAZON_SOCIAL;
        let domicilio = config_1.DOMICILIO_FISCAL;
        let cuit = config_1.CUIT;
        let regimenTributario = config_1.REGIMEN_TRIBUTARIO;
        let iibb = config_1.IIBB;
        let inicioActividad = config_1.INICIO_ACTIVIDAD;
        let fechaEmision = (0, moment_1.default)().format("DD-MM-YYYY");
        const conceptoFinal = () => {
            const conceptos = {
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
            .replace("{{importeGravado}}", data.importeGravado);
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
        return pdfData;
    }
    catch (error) {
        throw new Error(`An error occurred while generating the PDF: ${error}`);
    }
};
exports.generatePDF = generatePDF;
