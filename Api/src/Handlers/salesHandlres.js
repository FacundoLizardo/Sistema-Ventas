const postSaleController = require("../Controllers/sales/postSaleController")

const getSales = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const postSale = async (req, res) => {
    const {products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId} = req.body

    console.log( req.body);
    try {
        const newSale = await postSaleController(products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId)
        return res.status(200).json(newSale)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const putSale = async (req, res) => {

    try {

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const deleteSale = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getSales, postSale, putSale, deleteSale
}