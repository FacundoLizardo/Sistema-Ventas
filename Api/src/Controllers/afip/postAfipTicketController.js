const Afip = require('@afipsdk/afip.js');
const afip = new Afip({ CUIT: 20409378472 });
const path = require('path');
const htmlPath = path.join(__dirname, 'bill.html')

const postAfipTicketController = async () => {

    // Descargamos el HTML de ejemplo (ver mas arriba)
	// y lo guardamos como bill.html
	const html = require('fs').readFileSync(htmlPath, 'utf8');
	
	// Nombre para el archivo (sin .pdf)
	const name = 'PDF de prueba';
	
	// Opciones para el archivo
	const options = {
		width: 8, // Ancho de pagina en pulgadas. Usar 3.1 para ticket
		marginLeft: 0.4, // Margen izquierdo en pulgadas. Usar 0.1 para ticket 
		marginRight: 0.4, // Margen derecho en pulgadas. Usar 0.1 para ticket 
		marginTop: 0.4, // Margen superior en pulgadas. Usar 0.1 para ticket 
		marginBottom: 0.4 // Margen inferior en pulgadas. Usar 0.1 para ticket 
	};
	
	// Creamos el PDF
	const res = await afip.ElectronicBilling.createPDF({
		html: html,
		file_name: name,
		options: options
	});
	
	// Mostramos la url del archivo creado
	console.log(res.file);
}

module.exports = postAfipTicketController