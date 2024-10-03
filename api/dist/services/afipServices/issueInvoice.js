"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueInvoice = issueInvoice;
const config_1 = require("../../config");
const afip_js_1 = __importDefault(require("@afipsdk/afip.js"));
const qrcode_1 = __importDefault(require("qrcode"));
const db_1 = require("../../db");
const generatePDF_1 = require("./generatePDF");
const serviceError_1 = require("../../utils/serviceError");
const updateProductStock_1 = require("../../utils/updateProductStock");
const date_fns_1 = require("date-fns");
const CustomerServices_1 = __importDefault(require("../CustomerServices"));
const UserServices_1 = __importDefault(require("../UserServices"));
const afip = new afip_js_1.default({ CUIT: config_1.CUIT });
async function issueInvoice({ req }) {
    const { products, discount, cbteTipo, ptoVta, concepto, importeGravado, importeExentoIva, docNro, docTipo, iva, isdelivery, comments, deliveryAddress, branchId, userId, } = req.body;
    const { companyId } = req.params;
    const sequelize = db_1.Product.sequelize;
    const transaction = await sequelize.transaction();
    try {
        let importe_gravado = importeGravado;
        let importe_exento_iva = importeExentoIva;
        // Aplicar el descuento tanto al importe gravado como al importe exento de IVA
        const descuento = discount || 0;
        const importe_gravado_con_descuento = importe_gravado * (1 - descuento / 100);
        const importe_exento_iva_con_descuento = importe_exento_iva * (1 - descuento / 100);
        // Calcular el importe del IVA
        const porcentajeIVA = iva; // Porcentaje del IVA
        const importe_iva = (importe_gravado_con_descuento * porcentajeIVA) / 100;
        // Calcular el importe total
        const ImpTotConc = 0;
        const ImpTrib = 0;
        const ImpTotal = cbteTipo === 11
            ? importe_gravado_con_descuento + ImpTrib
            : ImpTotConc +
                importe_gravado_con_descuento +
                importe_exento_iva_con_descuento +
                ImpTrib +
                importe_iva;
        let fecha_servicio_desde = null;
        let fecha_servicio_hasta = null;
        let fecha_vencimiento_pago = null;
        // Actualizar el stock de los productos
        await (0, updateProductStock_1.updateProductStock)(products, branchId, transaction);
        const lastVoucher = await afip.ElectronicBilling.getLastVoucher(ptoVta, cbteTipo);
        const numeroFactura = lastVoucher + 1;
        const fecha = (0, date_fns_1.format)(new Date(), "yyyyMMdd");
        /**
         * Concepto de la factura
         Opciones:
         1 = Productos
         2 = Servicios
         3 = Productos y Servicios
         **/
        if (concepto === 2 || concepto === 3) {
            fecha_servicio_desde = 20191213;
            fecha_servicio_hasta = 20191213;
            fecha_vencimiento_pago = 20191213;
        }
        const data = {
            CantReg: 1,
            PtoVta: ptoVta,
            CbteTipo: cbteTipo,
            Concepto: concepto,
            DocTipo: docTipo,
            DocNro: docNro,
            CbteDesde: numeroFactura,
            CbteHasta: numeroFactura,
            CbteFch: fecha,
            FchServDesde: fecha_servicio_desde,
            FchServHasta: fecha_servicio_hasta,
            FchVtoPago: fecha_vencimiento_pago,
            ImpTotal: ImpTotal.toFixed(2),
            ImpTotConc: ImpTotConc.toFixed(2),
            ImpNeto: importe_gravado_con_descuento.toFixed(2),
            ImpOpEx: importe_exento_iva_con_descuento.toFixed(2),
            ImpIVA: cbteTipo === 11 ? 0 : importe_iva.toFixed(2),
            ImpTrib: 0,
            MonId: "PES",
            MonCotiz: 1,
            ...(cbteTipo !== 11
                ? {
                    Iva: [
                        {
                            Id: 5,
                            BaseImp: importe_gravado_con_descuento.toFixed(2),
                            Importe: importe_iva.toFixed(2),
                        },
                    ],
                }
                : {}),
            products: products,
            importeGravado: importeGravado.toFixed(2),
        };
        const voucherData = await afip.ElectronicBilling.createVoucher(data);
        const qrData = {
            ver: 1,
            fecha: fecha,
            cuit: config_1.CUIT,
            ptoVta: data.PtoVta,
            tipoCmp: data.CbteTipo,
            nroCmp: numeroFactura,
            importe: data.ImpTotal,
            moneda: data.MonId,
            ctz: data.MonCotiz,
            tipoDocRec: data.DocTipo,
            nroDocRec: data.DocNro,
            tipoCodAut: "E",
            codAut: 70417054367476,
        };
        const jsonData = JSON.stringify(qrData);
        const base64Data = btoa(jsonData);
        const URL = `https://www.afip.gob.ar/fe/qr/?p=${base64Data}`;
        const urlQr = await qrcode_1.default.toDataURL(URL);
        const pdfData = await (0, generatePDF_1.generatePDF)({
            voucherData,
            data,
            numeroFactura,
            urlQr,
            discount,
        });
        const customer = await CustomerServices_1.default.getCustomerByDocument({
            docTipo,
            docNro,
        });
        const customerInfo = customer?.docTipo === "80"
            ? `CUIT: ${customer.docNro} - Empresa: ${customer.companyName}`
            : customer?.docTipo === "96"
                ? `DNI: ${customer.docNro} - Cliente: ${customer.firstName} ${customer.lastName}`
                : "No se encontró información del cliente";
        const userData = await UserServices_1.default.getUser(userId);
        const user = `${userData?.firstName} ${userData?.lastName}`;
        const operationData = {
            products: products,
            amount: ImpTotal,
            discount: discount || 0,
            extraCharge: 0,
            debtAmount: 0,
            branchId: branchId,
            paymentType: "cash",
            invoiceNumber: numeroFactura.toString(),
            state: "completed",
            isdelivery: isdelivery,
            deliveryAddress: deliveryAddress,
            customer: customerInfo,
            comments: comments,
            invoiceLink: pdfData.file,
            companyId: companyId,
            userId: userId,
            cbteTipo: cbteTipo,
            user: user,
        };
        await db_1.Operation.create(operationData, { transaction });
        await transaction.commit();
        console.log({
            cae: voucherData.CAE,
            vencimiento: voucherData.CAEFchVto,
        });
        return pdfData;
    }
    catch (error) {
        (0, serviceError_1.serviceError)(error);
    }
}
// --------------------------------------------------------------------
/*

  FACTURA A

   {
      "products": [
        {
          "id": "69d32a36-cbf5-4633-96bd-24844d60ae55",
          "name": "Vino tinto",
          "finalPrice": 100
        },
        {
          "id": "3ee851fe-ad37-4066-8237-faf0cef3b0b0",
          "name": "Vino blanco",
          "finalPrice": 100
        }
      ],
      "discount": 10,
      "cbteTipo": 1,
      "ptoVta": 1,
      "concepto": 1,
      "importeGravado": 200,
      "importeExentoIva": 0,
      "docNro": 33693450239,
      "docTipo": 80,
      "iva": 21,
      "outputDir": "C:/Users/lucas/Downloads",
      "paymentType": "cash",
      "isdelivery": false,
      "deliveryAddress": "Calle pepito",
      "comments": "",
      "branchId": "",
      "userId": "5592d25d-f0b2-4287-adc4-9bc938f7e87e"
    }

    FACTURA B

    FACTURA C

*/
