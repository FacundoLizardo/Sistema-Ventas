/* const { User } = require("../../db");

const getAllUsersController = async () => {
	try {
		const Users = await User.findAll();
		return Users || [];
	} catch (error) {
		throw new Error(`Error while fetching users: ${error.message}`);
	}
};

module.exports = { getAllUsersController };
 */