/* const { Costumer } = require("../../db");

const deleteCostumerController = async (dni) => {
	try {
		const existingCostumer = await Costumer.findOne({
			where: { dni: dni },
		});

		if (!existingCostumer) {
			throw new Error(`The Costumer whit the dni:${dni} does not exist`);
		}
		const deleteCostumer = await Costumer.destroy({
			where: { dni: dni },
		});
		return deleteCostumer;
	} catch (error) {
		throw new Error(
			`Error while processing Costumer deletion: ${error.message}`
		);
	}
};

module.exports = { deleteCostumerController };
 */