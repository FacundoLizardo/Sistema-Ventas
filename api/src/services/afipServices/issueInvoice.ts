import { CUIT } from "../../config";
import Afip from "@afipsdk/afip.js";
import { ProductInterface } from "../../models/product";
import QRCode from "qrcode";
import { serviceError } from "../../utils/serviceError";
import { Request } from "express";
import { generatePDF } from "./generatePDF";

const afip = new Afip({ CUIT: CUIT });

export async function issueInvoice({ req }: { req: Request }) {
  const {
    products,
    discount,
    cbteTipo,
    ptoVta,
    concepto,
    importeExentoIva,
    docNro,
    docTipo,
  } = req.body;

  const redColor = "\x1b[31m";
  const resetColor = "\x1b[0m";
  console.log(redColor + "GENERANDO VOUCHER" + resetColor);

  try {
    const lastVoucher = await afip.ElectronicBilling.getLastVoucher(
      ptoVta,
      cbteTipo
    );
    let numeroFactura = lastVoucher + 1;
    const fecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    let importe_gravado = 0;
    let importe_exento_iva = importeExentoIva;
    let importe_iva = 0;
    let ImpTrib = 0;

    let fecha_servicio_desde = null;
    let fecha_servicio_hasta = null;
    let fecha_vencimiento_pago = null;

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

    products.forEach((product: ProductInterface) => {
      importe_gravado +=
        discount > 0
          ? Number(product.finalPrice || 0 * discount)
          : Number(product.finalPrice);
      const ivaRate = 21;
      const ivaAmount = (Number(product.finalPrice) * ivaRate) / 100;
      importe_iva += ivaAmount;
    });

    let ImpTotal = importe_gravado + importe_iva + importe_exento_iva;
    let ImpIVA = parseFloat(importe_iva.toFixed(2));

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
      ImpTotal: cbteTipo === 11 ? importe_gravado + ImpTrib : Number(ImpTotal),
      ImpTotConc: 0,
      ImpNeto: importe_gravado,
      ImpOpEx: importe_exento_iva,
      ImpIVA: cbteTipo === 11 ? "0" : ImpIVA,
      MonId: "PES",
      MonCotiz: 1,
      ...(cbteTipo !== 11
        ? {
            Iva: [
              {
                Id: 5, // Id del tipo de IVA (5 = 21%)
                BaseImp: importe_gravado,
                Importe: ImpIVA,
              },
            ],
          }
        : {}),

      products: products,
      ImpTrib: ImpTrib,
    };

    console.log("data", data);

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

    return pdfData;
  } catch (error) {
    serviceError(error);
  }
}
