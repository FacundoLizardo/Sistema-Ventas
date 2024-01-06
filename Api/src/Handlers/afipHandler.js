const postFacturaController = require("../Controllers/afip/postFacturaController");
const { putProductQuantityController } = require("../Controllers/products/putProductController");

const postAfip = async (req, res) => {
    const { products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva } = req.body
    try {

        const afipInvoice = await postFacturaController({ products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva });

        if (afipInvoice) {
            for (const product of products) {

                const { productId, quantity } = product
                await putProductQuantityController({ productId, quantity })
            
            }
        }

        return res.status(200).json({ success: true, afipInvoice })

    } catch (error) {

        console.error('Error in postAfip:', error);
        return res.status(400).json({ error: error.message });

    }
}

module.exports = { postAfip }