const Afip = require('@afipsdk/afip.js');
const afip = new Afip({ CUIT: 20409378472 });
const path = require('path');
const htmlPath = path.join(__dirname, 'bill.html')

const postAfipTicketController = async () => {
    const html = require('fs').readFileSync(htmlPath, 'utf8');

    const name = "PDF de prueba"

    const options = {
        width: 8, // Ancho de pagina en pulgadas. Usar 3.1 para ticket
        marginLeft: 0.4, // Margen izquierdo en pulgadas. Usar 0.1 para ticket 
        marginRight: 0.4, // Margen derecho en pulgadas. Usar 0.1 para ticket 
        marginTop: 0.4, // Margen superior en pulgadas. Usar 0.1 para ticket 
        marginBottom: 0.4 // Margen inferior en pulgadas. Usar 0.1 para ticket 
    };

    const res = await afip.ElectronicBilling.createPDF({
        html: html,
        file_name: name,
        options: options
    })
    console.log(res.file);
    return res.file
}

module.exports = postAfipTicketController