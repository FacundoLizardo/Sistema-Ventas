/* const { CashRegister } = require("../../db");

const putCashRegisterController = async (
    cashId,
    userId,
    initialAmount,
    finalAmount,
    income,
    egress,
    totalCashRegister,
    comments
) => {
    const existingCashRegister = await CashRegister.findOne({
        where: { cashId: cashId },
    });

    if (!existingCashRegister) {
        throw new Error(`The cash register with the id ${cashId} does not exist`);
    }

    const updatedCashRegister = await CashRegister.update(
        {
            userId,
            initialAmount,
            finalAmount,
            income,
            egress,
            totalCashRegister,
            comments,
        },
        {
            where: { cashId: cashId },
        }
    );

    if (updatedCashRegister) {
        return updatedCashRegister
    } else {
        throw new Error(`Error while updating cash register: Cash register with id ${cashId} not updated`);
    }
};

module.exports = { putCashRegisterController };
 */