const { User } = require("../../db");

const postUserController = async (
	firstName,
	lastName,
	email,
	address,
	phoneNumber,
	cuit,
	branch,
	enabled,
	role
) => {
	try {
		const [newUser, created] = await User.findOrCreate({
			where: { cuit: cuit },
			defaults: {
				firstName,
				lastName,
				email,
				address,
				phoneNumber,
				cuit,
				branch,
				enabled,
				role,
			},
		});

		return created
			? newUser
			: "User not created because it already exists or something is wrong, please try again";
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = postUserController;
