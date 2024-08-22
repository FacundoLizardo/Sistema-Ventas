/* const { User } = require("../../db");
const bcrypt = require("bcrypt");

const loginController = async (email, password) => {
	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			throw new Error(`User whit the email: ${email} not found.`);
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			throw new Error("Invalid password.");
		}

		if (user && validPassword) {
			return true;
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = { loginController };
 */