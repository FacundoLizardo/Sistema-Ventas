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
		const existingCashRegister = await CashRegister.findOne({
			where: { cashId: cashId },
		});

		if (!existingCashRegister) {
			throw new Error(`The cash register whit the id:${cashId} does not exist`);
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

		return updatedCashRegister;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = putCashRegisterController;
