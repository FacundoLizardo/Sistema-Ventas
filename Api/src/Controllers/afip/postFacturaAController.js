require("dotenv").config()

const moment = require('moment')
const { RAZON_SOCIAL, CUIT, DOMICILIO_FISCAL, INICIO_ACTIVIDAD, REGIMEN_TRIBUTARIO, IIBB } = process.env
const Afip = require('@afipsdk/afip.js');
const afip = new Afip({ CUIT: CUIT });
const path = require('path');
const fs = require('fs')

const generateVoucherForFA = async ({ products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva }) => {

	const redColor = '\x1b[31m';
	const resetColor = '\x1b[0m';
	console.log(redColor + "GENERANDO VOUCHER" + resetColor);

	try {

		const lastVoucher = await afip.ElectronicBilling.getLastVoucher(ptoVta, cbteTipo);
		const numeroFactura = lastVoucher + 1;
		const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

		let importe_gravado = 0;
		let importe_exento_iva = importeExentoIva;
		let importe_iva = 0;

		let fecha_servicio_desde = null;
		let fecha_servicio_hasta = null;
		let fecha_vencimiento_pago = null;

		if (concepto === 2 || concepto === 3) {
			fecha_servicio_desde = 20191213;
			fecha_servicio_hasta = 20191213;
			fecha_vencimiento_pago = 20191213;
		}

		products.forEach(product => {
			importe_gravado += parseFloat(product.finalPrice);
			const ivaRate = 21;
			const ivaAmount = (parseFloat(product.finalPrice) * ivaRate) / 100;
			importe_iva += ivaAmount;
		});

		let ImpTotal = parseFloat(importe_gravado + importe_iva + importe_exento_iva).toFixed(2)
		let ImpIVA = parseFloat(importe_iva.toFixed(2));

		const data = {
			'CantReg': 1,
			'PtoVta': ptoVta,
			'CbteTipo': cbteTipo,
			'Concepto': concepto,
			'DocTipo': docTipo,
			'DocNro': docNro,
			'CbteDesde': numeroFactura,
			'CbteHasta': numeroFactura,
			'CbteFch': parseInt(fecha.replace(/-/g, '')),
			'FchServDesde': fecha_servicio_desde,
			'FchServHasta': fecha_servicio_hasta,
			'FchVtoPago': fecha_vencimiento_pago,
			'ImpTotal': Number(ImpTotal),
			'ImpTotConc': 0,
			'ImpNeto': importe_gravado,
			'ImpOpEx': importe_exento_iva,
			'ImpIVA': ImpIVA,
			'MonId': 'PES',
			'MonCotiz': 1,
			'Iva': [
				{
					'Id': 5, // Id del tipo de IVA (5 = 21%)
					'BaseImp': importe_gravado,
					'Importe': ImpIVA
				}
			],
			"products": products
		};

		console.log("data", data);

		const voucherData = await afip.ElectronicBilling.createVoucher(data);

		return { voucherData, data };

	} catch (error) {
		console.error('Error en generateVoucherForFA:', error);
		throw error;
	}
}

const generatePDFForFAVoucher = async (voucherData, data, numeroFactura) => {
	try {
		const htmlPath = path.join(__dirname, 'facturaA.html');
		let html = fs.readFileSync(htmlPath, 'utf8');

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

			const tableRows = Array.from(productMap.values()).map((product) => `
        <tr>
            <td>${product.quantity}</td>
            <td>${product.description}</td>
            <td>${product.unitPrice.toFixed(2)}</td>
            <td>${product.totalAmount.toFixed(2)}</td>
        </tr>
    `).join('');

			return `${tableHeader}${tableRows}`;
		};

		let productRows = generateProductRows(data.products);
		let razonSocial = RAZON_SOCIAL;
		let domicilio = DOMICILIO_FISCAL;
		let cuit = CUIT;
		let regimenTributario = REGIMEN_TRIBUTARIO;
		let iibb = IIBB;
		let inicioActividad = INICIO_ACTIVIDAD;
		let fechaEmision = moment().format('DD-MM-YYYY')

		const conceptoFinal = () => {
			if (data.Concepto === 1) {
				return "Productos"
			} else if (data.Concepto === 2) {
				return "Servicios"
			} else if (data.Concepto === 3) {
				return "Productos y Servicios"
			}
		}


		const replacedHTML = html
			.replace('{{CAE}}', voucherData.CAE || "")
			.replace('{{Vencimiento}}', voucherData.CAEFchVto || "")
			.replace("{{razonSocial}}", razonSocial || "")
			.replace("{{domicilio}}", domicilio || "")
			.replace("{{cuit}}", cuit || "")
			.replace("{{regimenTributario}}", regimenTributario || "")
			.replace("{{iibb}}", iibb || "")
			.replace("{{inicioActividad}}", inicioActividad || "")
			.replace('{{productRows}}', productRows || "")
			.replace('{{ImpTotal}}', data.ImpTotal || "")
			.replace("{{cbteTipo}}", data.CbteTipo || "")
			.replace("{{ptoVta}}", data.ptoVta || "")
			.replace("{{numeroFactura}}", numeroFactura || "")
			.replace("{{concepto}}", conceptoFinal())
			.replace("{{condicionIVA}}", "")
			.replace("{{fecha}}", fechaEmision)


		const options = {
			width: 8,
			marginLeft: 0.4,
			marginRight: 0.4,
			marginTop: 0.4,
			marginBottom: 0.4
		};

		const pdfData = await afip.ElectronicBilling.createPDF({
			html: replacedHTML,
			file_name: 'Voucher',
			options: options
		});

		console.log("Datos del PDF generado:", pdfData);


	} catch (error) {
		console.error('Ocurrió un error al generar el PDF:', error);
		throw new Error(error);
	}
};


const postFacturaAController = async ({ products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva }) => {
	try {
		const { voucherData, data } = await generateVoucherForFA({ products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva });

		return await generatePDFForFAVoucher(voucherData, data);
	} catch (error) {
		console.error('Ocurrió un error:', error);
	}
};




module.exports = postFacturaAController