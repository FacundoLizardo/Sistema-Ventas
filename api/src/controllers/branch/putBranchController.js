/* const { Branch } = require("../../db");

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
	try {
		const existingBranch = await Branch.findOne({
			where: { branchId: branchId },
		});

		if (!existingBranch) {
			throw new Error(`The branch whit the id:${branchId} does not exist`);
		}
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
			},
			{
				where: { branchId: branchId },
			}
		);

		return updatedBranch;

	} catch (error) {
		throw new Error(`Error while updating branch: ${error.message}`);
	}
};

module.exports = { putBranchController };
 */