const { Branch } = require("../../db");

const deleteBranchController = async (branchId) => {
	try {
		const existingBranch = await Branch.findOne({
			where: { branchId: branchId },
		});
		if (!existingBranch) {
			throw new Error(`The branch whit the id: ${branchId} does not exist`);
		}
		const deleteBranch = await Branch.destroy({
			where: { branchId: branchId },
		});
		return deleteBranch;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = { deleteBranchController };
