const { Costumer } = require("../../db");

const putCostumerController = async (
	dni,
	firstName,
	lastName,
	email,
	address,
	phoneNumber,
	dateOfBirth,
	enableDebt
) => {
	try {
		const existingCostumer = await Costumer.findOne({
			where: { dni: dni },
		});

		if (!existingCostumer) {
			throw new Error(`The Costumer whit the dni:${dni} does not exist`);
		}
		const updatedCostumer = await Costumer.update(
			{
				dni,
				firstName,
				lastName,
				email,
				address,
				phoneNumber,
				dateOfBirth,
				enableDebt,
			},
			{
				where: { dni: dni },
			}
		);

		return updatedCostumer;
	} catch (error) {
		throw new Error(`Error when updating Costumer: ${error.message}`);
	}
};

module.exports = { putCostumerController };
