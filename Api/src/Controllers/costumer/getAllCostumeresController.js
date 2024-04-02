const { Costumer } = require("../../db");

const getAllCostumeresController = async () => {
	try {
		const costumers = await Costumer.findAll();
		return costumers || [];
	} catch (error) {
		throw new Error(`Error while fetching costumers: ${error.message}`);
	}
};

module.exports = { getAllCostumeresController };
