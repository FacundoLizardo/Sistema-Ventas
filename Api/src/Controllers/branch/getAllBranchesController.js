const { Branch } = require("../../db");

const getAllBranchesController = async () => {
	try {
		const branches = await Branch.findAll();

		return branches || [];
	} catch (error) {
		throw new Error("Error while fetching Branchs from the database");
	}
};

module.exports = { getAllBranchesController };
