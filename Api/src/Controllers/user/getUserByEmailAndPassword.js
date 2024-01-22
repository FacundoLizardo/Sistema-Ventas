const { User } = require("../../db");

const getUserByEmailAndPasswordController = async ({ email, password }) => {
	try {
		const user = await User.findOne({
			where: { email: email },
		});

		if (!user) {
			throw new Error(`User whit the email: ${email} does not exist.`);
		}

		if (user.password !== password) {
			throw new Error("Wrong password, please try again.");
		}
		if (user && user.password === password) {
			return user;
		}
	} catch (error) {
		throw new Error(`Error retrieving user: ${error.message}`);
	}
};

module.exports = { getUserByEmailAndPasswordController };
