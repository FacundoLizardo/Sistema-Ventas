const postCashRegisterController = require("../Controllers/cashRegister/postCashRegisterController");
// const deleteCashRegisterController = require("../Controllers/CashRegister/deleteCashRegisterController");
// const getAllCashRegistersController = require("../Controllers/CashRegister/getAllCashRegistersController");
const getCashRegisterByIdController = require("../Controllers/cashRegister/getCashRegisterByIdController");
// const putCashRegisterController = require("../Controllers/CashRegister/putCashRegisterController");

const getCashRegister = async (req, res) => {
	const { id } = req.params;
	try {
		const cashRegister = await getCashRegisterByIdController(id);
		cashRegister
			? res.status(200).json({ success: true, cashRegister })
			: res
					.status(404)
					.json({ success: false, message: "No cash registers found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const getCashRegisters = async (req, res) => {
	try {
		const cashRegisteres = await getAllCashRegistersController();
		cashRegisteres
			? res.status(200).json({ success: true, cashRegisters })
			: res
					.status(404)
					.json({ success: false, message: "No cash registers found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const postCashRegister = async (req, res) => {
	const {
		userId,
		initialAmount,
		finalAmount,
		income,
		egress,
		totalCashRegister,
		comments,
	} = req.body;
	if (!initialAmount || !userId) {
		return res.status(404).json("Error: The initial amount is mandatory.");
	}
	try {
		const newCashRegister = await postCashRegisterController(
			userId,
			initialAmount,
			finalAmount,
			income,
			egress,
			totalCashRegister,
			comments
		);
		console.log(newCashRegister);
		return res.status(200).json(newCashRegister);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const putCashRegister = async (req, res) => {
	try {
		const CashRegisterId = req.params.id;
		const {
			afipId,
			name,
			location,
			isStorage,
			enable,
			manager,
			hours,
			phoneNumber,
		} = req.body;

		const updatedCashRegister = await putCashRegisterController(
			CashRegisterId,
			afipId,
			name,
			location,
			isStorage,
			enable,
			manager,
			hours,
			phoneNumber
		);
		res.status(200).json(updatedCashRegister);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const deleteCashRegister = async (req, res) => {
	try {
		const CashRegisterId = req.params.id;
		const deletedCashRegister = await deleteCashRegisterController(
			CashRegisterId
		);
		res.status(200).json(deletedCashRegister);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getCashRegister,
	getCashRegisters,
	postCashRegister,
	putCashRegister,
	deleteCashRegister,
};
