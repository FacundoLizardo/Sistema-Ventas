"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTicket = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("fs");
const moment_1 = __importDefault(require("moment"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const config_1 = require("../../config");
const serviceError_1 = require("../../utils/serviceError");
const db_1 = require("../../db");
const updateProductStock_1 = require("../../utils/updateProductStock");
const generateTicket = (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
    const { products, cbteTipo, outputDir, discount, importeGravado, branchId } = req.body;
    const sequelize = db_1.Product.sequelize;
    const transaction = yield sequelize.transaction();
    try {
        const htmlPath = cbteTipo === 0 ? path_1.default.join(__dirname, "ticket.html") : "";
        let html = fs_1.default.readFileSync(htmlPath, "utf8");
        yield (0, updateProductStock_1.updateProductStock)(products, branchId, transaction);
        yield transaction.commit();
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
        let productRows = generateProductRows(products);
        let razonSocial = config_1.RAZON_SOCIAL;
        let domicilio = config_1.DOMICILIO_FISCAL;
        let fechaEmision = (0, moment_1.default)().format("DD-MM-YYYY");
        const ImpTotal = (importeGravado * (1 - discount / 100)).toFixed(2);
        const replacedHTML = html
            .replace("{{razonSocial}}", razonSocial || "")
            .replace("{{domicilio}}", domicilio || "")
            .replace("{{productRows}}", productRows || "")
            .replace("{{fecha}}", fechaEmision)
            .replace("{{discount}}", discount.toFixed(2) || "")
            .replace("{{importeGravado}}", importeGravado || "")
            .replace("{{ImpTotal}}", ImpTotal || "");
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.setContent(replacedHTML, { waitUntil: "networkidle0" });
        // Construcción de la ruta del archivo PDF
        const pdfFileName = `Ticket-${(0, moment_1.default)().format("DD.MM.YYYY-HH.mm")}.pdf`;
        const pdfFilePath = path_1.default.join(outputDir, pdfFileName);
        // Asegúrate de que el directorio exista
        yield fs_2.promises.mkdir(path_1.default.dirname(pdfFilePath), { recursive: true });
        // Generación del PDF
        yield page.pdf({
            path: pdfFilePath,
            format: "A4",
            margin: {
                top: "0.4in",
                right: "0.4in",
                bottom: "0.4in",
                left: "0.4in",
            },
        });
        yield browser.close();
        console.log("PDF generado y guardado en:", pdfFilePath);
        return { pdfFilePath };
    }
    catch (error) {
        (0, serviceError_1.serviceError)(error);
    }
});
exports.generateTicket = generateTicket;
