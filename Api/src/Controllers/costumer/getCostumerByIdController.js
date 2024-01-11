const { Costumer } = require("../../db");

const getCostumerByIdController = async (dni) => {
	try {
		const costumer = await Costumer.findByPk(dni);
		return costumer || [];
	} catch (error) {
		throw new Error(
			`Error retrieving costumer from database: ${error.message}`
		);
	}
};

module.exports = { getCostumerByIdController };
