const { Branch } = require("../../db");

const putBranchController = async (
	branchId,
	afipId,
	name,
	location,
	isStorage,
	enable,
	manager,
	hours,
	phoneNumber
) => {
	const updatedAt = new Date().toISOString();
	try {
		const updatedBranch = await Branch.update(
			{
				afipId,
				name,
				location,
				isStorage,
				enable,
				manager,
				hours,
				phoneNumber,
				updatedAt,
			},
			{
				where: { branchId: branchId },
			}
		);

		return updatedBranch;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = putBranchController;
