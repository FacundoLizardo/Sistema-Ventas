/* const { User } = require("../../db");

const deleteUserController = async (cuit) => {
	try {
		const deletedUserCount = await User.destroy({
			where: { cuit: cuit },
		});

		if (deletedUserCount === 0) {
			throw new Error(`User with CUIT ${cuit} not found`);
		}

		return deletedUserCount;
	} catch (error) {
		throw new Error(`Error when deleting user: ${error.message}`);
	}
};

module.exports = { deleteUserController };
 */