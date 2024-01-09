const { Cash_Register } = require("../../db");

const getAllCashRegistersController = async () => {
	try {
		const cashRegisters = await Cash_Register.findAll();
		return cashRegisters || [];
	} catch (error) {
		throw new Error("Error while fetching Cash_Registers from the database");
	}
};

module.exports = getAllCashRegistersController;
