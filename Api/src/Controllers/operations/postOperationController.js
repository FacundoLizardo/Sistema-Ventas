const { Operation } = require("../../db")

const postOperationController = async (products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId) => {
    try {
        const operation = await Operation.create({
            products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId
        });

        return operation;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = postOperationController;
