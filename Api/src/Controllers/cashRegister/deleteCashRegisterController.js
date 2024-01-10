const { CashRegister } = require("../../db");
const deleteCashRegisterController = async (cashId) => {
	try {
		const deleteBranch = await CashRegister.destroy({
			where: { cashId: cashId },
		});
		return deleteBranch;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = deleteCashRegisterController;
