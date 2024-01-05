const { User } = require("../../db");

const deleteUserController = async (cuit) => {
	try {
		const deleteUser = await User.destroy({
			where: { cuit: cuit },
		});
		return deleteUser;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = deleteUserController;
