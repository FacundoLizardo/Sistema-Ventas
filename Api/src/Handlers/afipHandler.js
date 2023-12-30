const emitVoucherAndGeneratePDF = require("../Controllers/afip/postAfipTicketController");

const postAfip = async (req, res) => {
    const { ptoVta, cbteTipo, concepto, docTipo, docNro, importeGravado, importeExentoIva, importeIva, razonSocial, direccion, cuit, responsableInscripto, iibb, inicioActividad } = req.body
    try {
        const afipInvoice = await emitVoucherAndGeneratePDF({ ptoVta, cbteTipo, concepto, docTipo, docNro, importeGravado, importeExentoIva, importeIva, razonSocial, direccion, cuit, responsableInscripto, iibb, inicioActividad });
        return res.status(200).json({ success: true, afipInvoice })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = { postAfip }