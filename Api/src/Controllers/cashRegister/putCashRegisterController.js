const { Cash_Register } = require("../../db");

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
	const updatedAt = new Date().toISOString();
	try {
		const updatedCashRegister = await Cash_Register.update(
			{
				userId,
				initialAmount,
				finalAmount,
				income,
				egress,
				totalCashRegister,
				comments,
				updatedAt,
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
