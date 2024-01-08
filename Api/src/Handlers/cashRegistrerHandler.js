const postCashRegistrerController = require("../Controllers/cashRegistrer/postCashRegistrerController");
// const deleteCashRegistrerController = require("../Controllers/CashRegistrer/deleteCashRegistrerController");
// const getAllCashRegistrersController = require("../Controllers/CashRegistrer/getAllCashRegistrersController");
const getCashRegistrerByIdController = require("../Controllers/CashRegistrer/getCashRegistrerByIdController");
// const putCashRegistrerController = require("../Controllers/CashRegistrer/putCashRegistrerController");

const getCashRegistrer = async (req, res) => {
	const { id } = req.params;
	try {
		const cashRegistrer = await getCashRegistrerByIdController(id);
		cashRegistrer
			? res.status(200).json({ success: true, cashRegistrer })
			: res
					.status(404)
					.json({ success: false, message: "No cash registrers found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const getCashRegistrers = async (req, res) => {
	try {
		const cashRegistreres = await getAllCashRegistrersController();
		cashRegistreres
			? res.status(200).json({ success: true, cashRegistrers })
			: res
					.status(404)
					.json({ success: false, message: "No cash registrers found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const postCashRegistrer = async (req, res) => {
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
		const newCashRegistrer = await postCashRegistrerController(
			userId,
			initialAmount,
			finalAmount,
			income,
			egress,
			totalCashRegister,
			comments
		);
		console.log(newCashRegistrer);
		return res.status(200).json(newCashRegistrer);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const putCashRegistrer = async (req, res) => {
	try {
		const CashRegistrerId = req.params.id;
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

		const updatedCashRegistrer = await putCashRegistrerController(
			CashRegistrerId,
			afipId,
			name,
			location,
			isStorage,
			enable,
			manager,
			hours,
			phoneNumber
		);
		res.status(200).json(updatedCashRegistrer);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const deleteCashRegistrer = async (req, res) => {
	try {
		const CashRegistrerId = req.params.id;
		const deletedCashRegistrer = await deleteCashRegistrerController(
			CashRegistrerId
		);
		res.status(200).json(deletedCashRegistrer);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getCashRegistrer,
	getCashRegistrers,
	postCashRegistrer,
	putCashRegistrer,
	deleteCashRegistrer,
};
