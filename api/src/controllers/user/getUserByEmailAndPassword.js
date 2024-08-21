/* const { User } = require("../../db");

const getUserByEmailAndPasswordController = async ({ email, password }) => {
	try {
		const user = await User.findOne({
			where: { email: email },
		});
		const { branch, cuit, enabled, firstName, lastName, phoneNumber, role } =
			user;
		const data = {
			firstName,
			lastName,
			branch,
			email,
			cuit,
			enabled,
			phoneNumber,
			role,
		};
		if (!user) {
			throw new Error(`User whit the email: ${email} does not exist.`);
		}

		if (user.password !== password) {
			throw new Error("Wrong password, please try again.");
		}
		if (user && user.password === password) {
			return data;
		}
	} catch (error) {
		throw new Error(`Error retrieving user: ${error.message}`);
	}
};

module.exports = { getUserByEmailAndPasswordController };
 */