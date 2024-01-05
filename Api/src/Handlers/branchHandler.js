const postBranchController = require("../Controllers/Branchs/postBranchController");
const deleteBranchController = require("../Controllers/Branchs/deleteBranchController");
const getAllBranchsController = require("../Controllers/Branchs/getAllBranchsController");
const getBranchByIdController = require("../Controllers/Branchs/getBranchByIdController");
const putBranchController = require("../Controllers/Branchs/putBranchController");

const getBranch = async (req, res) => {
	const { id } = req.params;
	try {
		const branch = await getBranchByIdController(id);
		branch
			? res.status(200).json({ success: true, branch })
			: res.status(404).json({ success: false, message: "No branchs found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const getBranchs = async (req, res) => {
	try {
		const branchs = await getAllBranchsController();
		branchs
			? res.status(200).json({ success: true, branchs })
			: res.status(404).json({ success: false, message: "No branchs found." });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const postBranchs = async (req, res) => {
	const { name } = req.body;
	if (!name || !category || !quantity) {
		return res.status(404).json("Missing information.");
	}
	try {
		const newBranch = await postBranchController(name);
		return res.status(200).json(newBranch);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const putBranch = async (req, res) => {
	try {
		const BranchId = req.params.id;
		const { name } = req.body;

		const updatedBranch = await putBranchController(BranchId, name);
		res.status(200).json(updatedBranch);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const deleteBranch = async (req, res) => {
	try {
		const BranchId = req.params.id;
		const deletedBranch = await deleteBranchController(BranchId);
		res.status(200).json(deletedBranch);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getBranch,
	getBranchs,
	postBranchs,
	putBranch,
	deleteBranch,
};
