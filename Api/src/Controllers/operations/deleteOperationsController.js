const { Operation } = require("../../db");

const deleteOperationController = async (operationId) => {
	try {
		const deletedOperation = await Operation.destroy({
			where: { operationId: operationId },
		});
		if (deletedOperation === 0) {
			return `Operation whit the ID: ${operationId} does not exist `;
		}
		return deletedOperation;
	} catch (error) {
		throw new Error(
			`Error while processing operation deletion: ${error.message}`
		);
	}
};

module.exports = { deleteOperationController };
