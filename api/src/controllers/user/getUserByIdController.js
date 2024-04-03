const { User } = require("../../db");

const getUserByIdController = async (id) => {
	try {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error(`User with ID ${id} not found`);
		}
		return user;
	} catch (error) {
		throw new Error(`Error retrieving user: ${error.message}`);
	}
};

module.exports = { getUserByIdController };
