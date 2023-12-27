const { Operation } = require("../../db")

const postOperationController = async (products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId) => {
    try {
        const operation = await Operation.create({
            products, amount, discount, extraCharge, debtAmount, local, paymentType, mercadoPagoId, state, delivery, comments, customersId
        });

        const operationId = operation.operationId

        const updateOperation = await Operation.update({ state: "completed" }, { where: { operationId: operationId } })

        return updateOperation;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = postOperationController;
