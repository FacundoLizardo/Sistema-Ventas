/* const { Operation } = require("../../db");

const putOperationController = async (
	operationId,
	products,
	amount,
	discount,
	extraCharge,
	debtAmount,
	local,
	paymentType,
	mercadoPagoId,
	state,
	delivery,
	comments,
	customersId
) => {
	try {
		const existingOperation = await Operation.findOne({
			where: { operationId: operationId },
		});

		if (!existingOperation) {
			throw new Error(
				`The operation whit the id:${operationId} does not exist`
			);
		}

		const isValidProducts = products.every((product) => {
			return (
				typeof product === "object" &&
				product !== null &&
				"quantity" in product &&
				"product" in product &&
				typeof product.quantity === "number" &&
				typeof product.product === "object" &&
				product.product !== null
			);
		});

		if (!isValidProducts) {
			throw new Error(
				`Invalid structure for products. Each product should have 'quantity' and 'product'.`
			);
		}
		const updatedOperation = await Operation.update(
			{
				products,
				amount,
				discount,
				extraCharge,
				debtAmount,
				local,
				paymentType,
				mercadoPagoId,
				state,
				delivery,
				comments,
				customersId,
			},
			{
				where: { operationId: operationId },
			}
		);

		return updatedOperation;
	} catch (error) {
		throw new Error(`Error when updating Operation: ${error.message}`);
	}
};

const putOperationStockController = async ({ OperationId, stock }) => {
	try {
		const Operation = await Operation.findByPk(OperationId);

		if (Operation) {
			await Operation.update({
				stock: Operation.stock - 1,
			});
			return true;
		} else {
			throw new Error(`Operation with ID ${OperationId} not found`);
		}
	} catch (error) {
		throw new Error(`Error when updating Operation stock: ${error.message}`);
	}
};

module.exports = { putOperationController, putOperationStockController };
 */