const {
	postCostumersController,
} = require("../Controllers/costumer/postCostumerController");
// const {
// 	deleteCostumerController,
// } = require("../Controllers/Costumer/deleteCostumerController");
const {
	getAllCostumeresController,
} = require("../Controllers/Costumer/getAllCostumeresController");
const {
	getCostumerByIdController,
} = require("../Controllers/Costumer/getCostumerByIdController");
const {
	putCostumerController,
} = require("../Controllers/Costumer/putCostumerController");

const getCostumer = async (req, res) => {
	const dni = req.params.id;

	try {
		const costumer = await getCostumerByIdController(dni);
		costumer
			? res.status(200).json({ success: true, costumer })
			: res
					.status(404)
					.json({ success: false, message: "No Costumers found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const getAllCostumers = async (req, res) => {
	try {
		const Costumeres = await getAllCostumeresController();
		Costumeres
			? res.status(200).json({ success: true, Costumeres })
			: res
					.status(404)
					.json({ success: false, message: "No Costumers found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const postCostumer = async (req, res) => {
	const {
		dni,
		firstName,
		lastName,
		email,
		address,
		phoneNumber,
		dateOfBirth,
		enableDebt,
	} = req.body;
	if (!dni || !firstName || !lastName || !email) {
		return res.status(404).json("Missing information.");
	}
	try {
		const newCostumer = await postCostumersController(
			dni,
			firstName,
			lastName,
			email,
			address,
			phoneNumber,
			dateOfBirth,
			enableDebt
		);
		return res.status(200).json(newCostumer);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const putCostumer = async (req, res) => {
	try {
		const dni = req.params.id;
		const {
			firstName,
			lastName,
			email,
			address,
			phoneNumber,
			dateOfBirth,
			enableDebt,
		} = req.body;

		const updatedCostumer = await putCostumerController(
			dni,
			firstName,
			lastName,
			email,
			address,
			phoneNumber,
			dateOfBirth,
			enableDebt
		);
		res.status(200).json(updatedCostumer);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const deleteCostumer = async (req, res) => {
	try {
		const CostumerId = req.params.id;
		const deletedCostumer = await deleteCostumerController(CostumerId);
		res.status(200).json(deletedCostumer);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getCostumer,
	getAllCostumers,
	postCostumer,
	putCostumer,
	deleteCostumer,
};
