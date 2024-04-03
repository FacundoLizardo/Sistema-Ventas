const { CashRegister } = require("../../db");

const getCashRegisterByIdController = async (id) => {
	try {
		const cashRegister = await CashRegister.findByPk(id);
		return cashRegister || [];
	} catch (error) {
		throw new Error(`Error retrieving Cash Register with ID ${id} from the database: ${error.message}`);
	}
};

module.exports = { getCashRegisterByIdController };
