const { User } = require("../../db");

const getUserByIdController = async (id) => {
	try {
		const user = await User.findByPk(id);
		return user || [];
	} catch (error) {
		throw new Error("Error retrieving user from database.");
	}
};

module.exports = getUserByIdController;
