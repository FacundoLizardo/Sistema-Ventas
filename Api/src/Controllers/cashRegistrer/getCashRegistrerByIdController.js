const { Cash_Register } = require("../../db");

const getCashRegistrerByIdController = async (id) => {
	try {
		const cashRegistrer = await Cash_Register.findByPk(id);
		return cashRegistrer || [];
	} catch (error) {
		throw new Error("Error retrieving CashRegistrer from database.");
	}
};

module.exports = getCashRegistrerByIdController;
