require("dotenv").config();

const moment = require("moment");
const path = require("path");
const fs = require("fs");
const pdf = require("html-pdf");

const { RAZON_SOCIAL, DOMICILIO_FISCAL, BACKEND_URL } = process.env;

const generateTicket = async ({ products, cbteTipo, discount }) => {
  try {
    const htmlPath = cbteTipo === 0 ? path.join(__dirname, "ticket.html") : "";

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

    let productRows = generateProductRows(products);
    let razonSocial = RAZON_SOCIAL;
    let domicilio = DOMICILIO_FISCAL;
    let fechaEmision = moment().format("DD-MM-YYYY");

    const replacedHTML = html
      .replace("{{razonSocial}}", razonSocial || "")
      .replace("{{domicilio}}", domicilio || "")
      .replace("{{productRows}}", productRows || "")
      .replace("{{fecha}}", fechaEmision);

    const options = {
      width: 8,
      marginLeft: 0.4,
      marginRight: 0.4,
      marginTop: 0.4,
      marginBottom: 0.4,
    };

    const pdfFileName = `Ticket-${moment().format("DD.MM.YYYY-HH.mm")}.pdf`;
    const pdfFilePath = path.join(__dirname, "pdfs", pdfFileName);

    await new Promise((resolve, reject) => {
      pdf.create(replacedHTML, options).toFile(pdfFilePath, (err, _) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    const pdfFile = fs.readFileSync(pdfFilePath);
    return { pdfFile };
    
  } catch (error) {
    throw new Error(
      `An error occurred while generating the PDF: ${error.message}`
    );
  }
};

module.exports = { generateTicket };
