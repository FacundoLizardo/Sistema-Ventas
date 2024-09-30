import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import moment from "moment";
import puppeteer from "puppeteer";
import { DOMICILIO_FISCAL, RAZON_SOCIAL } from "../../config";
import { serviceError } from "../../utils/serviceError";
import { Request } from "express";
import { ProductInterface } from "../../models/product";
import { Product } from "../../db";
import { Sequelize } from "sequelize";
import { updateProductStock } from "../../utils/updateProductStock";

export const generateTicket = async ({ req }: { req: Request }) => {
  const { products, cbteTipo, outputDir, discount, importeGravado, branchId } = req.body;
  const sequelize = Product.sequelize as Sequelize;
  const transaction = await sequelize.transaction();

  try {
    const htmlPath = cbteTipo === 0 ? path.join(__dirname, "ticket.html") : "";
    let html = fs.readFileSync(htmlPath, "utf8");

    await updateProductStock(products, branchId, transaction);

    await transaction.commit();

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
            totalAmount: (existingProduct.totalAmount += finalPrice),
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

    const ImpTotal = (importeGravado * (1 - discount / 100)).toFixed(2);

    const replacedHTML = html
      .replace("{{razonSocial}}", razonSocial || "")
      .replace("{{domicilio}}", domicilio || "")
      .replace("{{productRows}}", productRows || "")
      .replace("{{fecha}}", fechaEmision)
      .replace("{{discount}}", discount.toFixed(2) || "")
      .replace("{{importeGravado}}", importeGravado || "")
      .replace("{{ImpTotal}}", ImpTotal || "");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(replacedHTML, { waitUntil: "networkidle0" });

    // Construcción de la ruta del archivo PDF
    const pdfFileName = `Ticket-${moment().format("DD.MM.YYYY-HH.mm")}.pdf`;
    const pdfFilePath = path.join(outputDir, pdfFileName);

    // Asegúrate de que el directorio exista
    await fsPromises.mkdir(path.dirname(pdfFilePath), { recursive: true });

    // Generación del PDF
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

    console.log("PDF generado y guardado en:", pdfFilePath);

    return { pdfFilePath };
  } catch (error) {
    serviceError(error);
  }
};
