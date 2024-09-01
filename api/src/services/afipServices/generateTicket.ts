import path from "path";
import fs from "fs";
import moment from "moment";
import puppeteer from "puppeteer";
import { DOMICILIO_FISCAL, RAZON_SOCIAL } from "../../config";
import { serviceError } from "../../utils/serviceError";
import { Request } from "express";

export const generateTicket = async ({ req }: { req: Request }) => {

  const { products, cbteTipo } = req.body;

  try {
    const htmlPath = cbteTipo === 0 ? path.join(__dirname, "ticket.html") : "";
    let html = fs.readFileSync(htmlPath, "utf8");

    const generateProductRows = (products: any[]) => {
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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(replacedHTML, { waitUntil: "networkidle0" });

    const pdfFileName = `Ticket-${moment().format("DD.MM.YYYY-HH.mm")}.pdf`;
    const pdfFilePath = path.join(__dirname, "html", "pdfs", pdfFileName);

    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      margin: {
        top: "0.4in",
        right: "0.4in",
        bottom: "0.4in",
        left: "0.4in",
      },
    });

    await browser.close();

    const pdfFile = fs.readFileSync(pdfFilePath);
    return { pdfFile };
  } catch (error) {
    serviceError(error);
  }
};
