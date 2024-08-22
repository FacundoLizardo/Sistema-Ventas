/* const { CashRegister } = require("../../db");

const getAllCashRegistersController = async () => {
	try {
		const cashRegisters = await CashRegister.findAll();
		return cashRegisters || [];
	} catch (error) {
		throw new Error(`Error while fetching Cash Registers from the database: ${error.message}`);
	}
};

module.exports = { getAllCashRegistersController };
 */