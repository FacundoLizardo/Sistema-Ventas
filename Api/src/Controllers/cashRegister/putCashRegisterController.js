const { CashRegister } = require("../../db");

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

	try {
		const updatedCashRegister = await CashRegister.update(
			{
				userId,
				initialAmount,
				finalAmount,
				income,
				egress,
				totalCashRegister,
				comments
			},
			{
				where: { cashId: cashId },
			}
		);

		return updatedCashRegister;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = putCashRegisterController;
