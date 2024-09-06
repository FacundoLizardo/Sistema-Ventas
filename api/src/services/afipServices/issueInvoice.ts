import { CUIT } from "../../config";
import Afip from "@afipsdk/afip.js";
import QRCode from "qrcode";
import { Request } from "express";
import { Sequelize } from "sequelize";
import { Product } from "../../db";
import { generatePDF } from "./generatePDF";
import { serviceError } from "../../utils/serviceError";

const afip = new Afip({ CUIT: CUIT });

export async function issueInvoice({ req }: { req: Request }) {
  const {
    products,
    discount,
    cbteTipo,
    ptoVta,
    concepto,
    importeGravado,
    importeExentoIva,
    docNro,
    docTipo,
    iva,
  } = req.body;

  const sequelize = Product.sequelize as Sequelize;
  const transaction = await sequelize.transaction();

  try {
    let importe_gravado = importeGravado;
    let importe_exento_iva = importeExentoIva;

    // Aplicar el descuento tanto al importe gravado como al importe exento de IVA
    const descuento = discount || 0;
    const importe_gravado_con_descuento =
      importe_gravado * (1 - descuento / 100);
    const importe_exento_iva_con_descuento =
      importe_exento_iva * (1 - descuento / 100);

    // Calcular el importe del IVA
    const porcentajeIVA = iva; // Porcentaje del IVA
    const importe_iva = (importe_gravado_con_descuento * porcentajeIVA) / 100;

    // Calcular el importe total
    const ImpTotConc = 0;
    const ImpTrib = 0;
    const ImpTotal =
      cbteTipo === 11
        ? importe_gravado_con_descuento + ImpTrib
        : ImpTotConc +
          importe_gravado_con_descuento +
          importe_exento_iva_con_descuento +
          ImpTrib +
          importe_iva;

    let fecha_servicio_desde = null;
    let fecha_servicio_hasta = null;
    let fecha_vencimiento_pago = null;

    for (const product of products) {
      const productRecord = await Product.findByPk(product.id, { transaction });

      if (!productRecord) {
        throw new Error(`Product with ID ${product.id} not found.`);
      }
    }

    const lastVoucher = await afip.ElectronicBilling.getLastVoucher(
      ptoVta,
      cbteTipo
    );

    let numeroFactura = lastVoucher + 1;
    const fecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

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
      CbteFch: parseInt(fecha.replace(/-/g, "")),
      FchServDesde: fecha_servicio_desde,
      FchServHasta: fecha_servicio_hasta,
      FchVtoPago: fecha_vencimiento_pago,
      ImpTotal: ImpTotal,
      ImpTotConc: ImpTotConc,
      ImpNeto: importe_gravado_con_descuento,
      ImpOpEx: importe_exento_iva_con_descuento,
      ImpIVA: cbteTipo === 11 ? 0 : importe_iva,
      ImpTrib: 0,
      MonId: "PES",
      MonCotiz: 1,
      ...(cbteTipo !== 11
        ? {
            Iva: [
              {
                Id: 5,
                BaseImp: importe_gravado_con_descuento,
                Importe: importe_iva,
              },
            ],
          }
        : {}),

      products: products,
      importeGravado: importe_gravado,
    };

    console.log("DATA", data);

    const voucherData = await afip.ElectronicBilling.createVoucher(data);

    const qrData = {
      ver: 1,
      fecha: fecha,
      cuit: CUIT,
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

    const urlQr = await QRCode.toDataURL(URL);

    const pdfData = await generatePDF({
      voucherData,
      data,
      numeroFactura,
      urlQr,
      discount,
    });
    console.log("pdfData", pdfData);

    console.log({
      cae: voucherData.CAE, //CAE asignado a la Factura
      vencimiento: voucherData.CAEFchVto, //Fecha de vencimiento del CAE
    });

    return pdfData;
  } catch (error) {
    serviceError(error);
  }
}

// --------------------------------------------------------------------

/* 

    {
      "products": [
        {
          "id": "11b8a085-22a2-4515-8f4c-36e86145a5db",
          "name": "Pelota",
          "finalPrice": 100
        },
        {
          "id": "11b8a085-22a2-4515-8f4c-36e86145a5db",
          "name": "Pelota",
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
      "outputDir": "C:/Users/lucas/Downloads"
    }

*/
