require("dotenv").config();
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const Afip = require("@afipsdk/afip.js")

const {
    RAZON_SOCIAL,
    CUIT,
    DOMICILIO_FISCAL,
    INICIO_ACTIVIDAD,
    REGIMEN_TRIBUTARIO,
    IIBB,
} = process.env;

const afip = new Afip({ CUIT: CUIT });

const generatePDF = async ({
  voucherData,
  data,
  numeroFactura,
  urlQr,
  discount,
}) => {
  try {
    const htmlPath =
      data.CbteTipo === 1
        ? path.join(__dirname, "html", "facturaA.html")
        : data.CbteTipo === 6
        ? path.join(__dirname, "html", "facturaB.html")
        : data.CbteTipo === 11
        ? path.join(__dirname, "html", "facturaC.html")
        : "";

    let html = fs.readFileSync(htmlPath, "utf8");

    const generateProductRows = (products) => {
      const productMap = new Map();

      products.forEach((product) => {
        const { productId, name, finalPrice } = product;
        if (!productMap.has(productId)) {
          productMap.set(productId, {
            description: name,
            quantity: 1,
            unitPrice: parseFloat(finalPrice),
            totalAmount: parseFloat(finalPrice),
          });
        } else {
          const existingProduct = productMap.get(productId);
          productMap.set(productId, {
            description: existingProduct.description,
            quantity: existingProduct.quantity + 1,
            unitPrice: existingProduct.unitPrice,
            totalAmount: existingProduct.totalAmount + parseFloat(finalPrice),
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
      if (data.Concepto === 1) {
        return "Productos";
      } else if (data.Concepto === 2) {
        return "Servicios";
      } else if (data.Concepto === 3) {
        return "Productos y Servicios";
      }
    };

    let condicionIVA = "";
    switch (data.DocTipo) {
      case 80: // CUIT
        condicionIVA = "Responsable Inscripto";
        break;
      case 96: // CUIL
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
      .replace("{{numeroFactura}}", numeroFactura || "")
      .replace("{{concepto}}", conceptoFinal())
      .replace("{{condicionIVA}}", condicionIVA)
      .replace("{{fecha}}", fechaEmision)
      .replace("{{ImpIVA}}", data.ImpIVA)
      .replace("{{ImpNeto}}", data.ImpNeto)
      .replace("{{discount}}", discount);

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

    console.log("Generated PDF data:", pdfData);
    return pdfData;
  
} catch (error) {
    throw new Error(
      `An error occurred while generating the PDF: ${error.message}`
    );
  }
};

module.exports = { generatePDF };
