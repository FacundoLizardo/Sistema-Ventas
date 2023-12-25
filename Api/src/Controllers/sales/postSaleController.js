const { Sale } = require("../../db");

const postSaleController = async (products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId) => {
    try {
        const sale = await Sale.create({
            products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId
        });

        return sale;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = postSaleController;
