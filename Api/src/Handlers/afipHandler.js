const postFacturaAController = require("../Controllers/afip/postFacturaAController");

const postAfip = async (req, res) => {
    const { products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva } = req.body
    try {
        if (cbteTipo === 1) {

            const afipInvoice = await postFacturaAController({ products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva });
            return res.status(200).json({ success: true, afipInvoice })
        }

    } catch (error) {
        console.error('Error in postAfip:', error);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { postAfip }