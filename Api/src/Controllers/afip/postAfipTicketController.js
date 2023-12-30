const Afip = require('@afipsdk/afip.js');
const afip = new Afip({ CUIT: 20409378472 });
const path = require('path');
const fs = require('fs')

const postAfipVoucherController = async ({ ptoVta, cbteTipo, concepto, docTipo, docNro, importeGravado, importeExentoIva, importeIva, razonSocial, direccion, cuit, responsableInscripto, iibb, inicioActividad }) => {

	const redColor = '\x1b[31m';
	const resetColor = '\x1b[0m';
	console.log(redColor + "GENERANDO VOUCHER" + resetColor);

	try {

		const lastVoucher = await afip.ElectronicBilling.getLastVoucher(ptoVta, cbteTipo);
		const numeroFactura = lastVoucher + 1;
		const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

		let fecha_servicio_desde = null;
		let fecha_servicio_hasta = null;
		let fecha_vencimiento_pago = null;

		if (concepto === 2 || concepto === 3) {
			fecha_servicio_desde = 20191213;
			fecha_servicio_hasta = 20191213;
			fecha_vencimiento_pago = 20191213;
		}


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
			'ImpTotal': importeGravado + importeIva + importeExentoIva,
			'ImpTotConc': 0,
			'ImpNeto': importeGravado,
			'ImpOpEx': importeExentoIva,
			'ImpIVA': importeIva,
			'ImpTrib': 0,
			'MonId': 'PES',
			'MonCotiz': 1,
			'Iva': [
				{
					'Id': 5,
					'BaseImp': importeGravado,
					'Importe': importeIva
				}
			],

			"razonSocial": razonSocial,
			"direccion": direccion,
			"cuit ": cuit,
			"responsableInscripto": responsableInscripto,
			"iibb": iibb,
			"inicioActividad": inicioActividad

		};

		console.log("Valores: ", data);

		const voucherData = await afip.ElectronicBilling.createVoucher(data);

		return { voucherData, data };

	} catch (error) {
		console.error('Error en postAfipVoucherController:', error);
		throw error;
	}
}

const postAfipTicketController = async (voucherData, data) => {
	try {
		const htmlPath = path.join(__dirname, 'bill.html');
		let html = fs.readFileSync(htmlPath, 'utf8');

		const replacedHTML = html
			.replace('{{CAE}}', voucherData.CAE || "")
			.replace('{{Vencimiento}}', voucherData.CAEFchVto || "")
			.replace("{{razonSocial}}", data.razonSocial)
			.replace("{{direccion}}", data.direccion)
			.replace("{{cuit}}", data.cuit)
			.replace("{{responsableInscripto}}", data.responsableInscripto)
			.replace("{{iibb}}", data.iibb)
			.replace("{{inicioActividad}}", data.inicioActividad)


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


const emitVoucherAndGeneratePDF = async ({ ptoVta, cbteTipo, concepto, docTipo, docNro, importeGravado, importeExentoIva, importeIva, razonSocial, direccion, cuit, responsableInscripto, iibb, inicioActividad }) => {
	try {
		const { voucherData, data } = await postAfipVoucherController({ ptoVta, cbteTipo, concepto, docTipo, docNro, importeGravado, importeExentoIva, importeIva, razonSocial, direccion, cuit, responsableInscripto, iibb, inicioActividad });

		console.log("Voucher creado exitosamente:");
		console.log(voucherData);
		console.log(data);

		await postAfipTicketController(voucherData, data);
	} catch (error) {
		console.error('Ocurrió un error:', error);
	}
};




module.exports = emitVoucherAndGeneratePDF