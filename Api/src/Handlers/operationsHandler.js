const { getOperationsController } = require("../Controllers/operations/getOperationsController")
const { postOperationController } = require("../Controllers/operations/postOperationController")


const getOperation = async (req, res) => {
    try {
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getOperations = async (req, res) => {
    try {
        const operations = await getOperationsController()
        return res.status(200).json({ success: true, operations })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const postOperation = async (req, res) => {
    const { products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId } = req.body

    try {
        const newSale = await postOperationController(products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId)
        return res.status(200).json(newSale)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const putOperation = async (req, res) => {

    try {

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const deleteOperation = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getOperation, getOperations, postOperation, putOperation, deleteOperation
}