/* const { Operation } = require("../../db");

const getOperationByIdController = async (id) => {
	try {
		const operation = await Operation.findByPk(id);
		console.log(operation);
		if (operation === null) {
			throw new Error(`The operation whit the id: ${id} does not exist`);
		}
		return operation || [];
	} catch (error) {
		throw new Error(
			`Error retrieving operation from database: ${error.message}`
		);
	}
};

module.exports = { getOperationByIdController };
 */