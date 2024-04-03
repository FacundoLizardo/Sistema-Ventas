const { postFacturaController } = require("../Controllers/afip/postFacturaController");
const { editProductStockController } = require("../Controllers/products/putProductsControllers.js");


const postAfip = async (req, res) => {
    const { products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva, discount } = req.body
    try {

        const afipInvoice = await postFacturaController({ products, ptoVta, cbteTipo, concepto, docTipo, docNro, importeExentoIva, discount });

        if (afipInvoice) {
            for (const product of products) {

                const { productId } = product
                await editProductStockController({ productId })

            }
        }

        return res.status(200).json({ success: true, afipInvoice })

    } catch (error) {

        console.error('Error in postAfip:', error);
        return res.status(400).json({ error: error.message });

    }
}

module.exports = { postAfip }