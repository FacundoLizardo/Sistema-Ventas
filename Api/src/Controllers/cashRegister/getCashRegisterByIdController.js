const { Cash_Register } = require("../../db");

const getCashRegisterByIdController = async (id) => {
	try {
		const cashRegister = await Cash_Register.findByPk(id);
		return cashRegister || [];
	} catch (error) {
		throw new Error("Error retrieving CashRegistrer from database.");
	}
};

module.exports = getCashRegisterByIdController;
