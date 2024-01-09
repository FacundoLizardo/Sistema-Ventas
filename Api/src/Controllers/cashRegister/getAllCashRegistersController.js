const { CashRegister } = require("../../db");

const getAllCashRegistersController = async () => {
	try {
		const cashRegisters = await CashRegister.findAll();
		return cashRegisters || [];
	} catch (error) {
		throw new Error("Error while fetching Cash_Registers from the database");
	}
};

module.exports = getAllCashRegistersController;
