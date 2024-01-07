const { Branch } = require("../../db");

const deleteBranchController = async (branchId) => {
	try {
		const deleteBranch = await Branch.destroy({
			where: { branchId: branchId },
		});
		return deleteBranch;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = deleteBranchController;
