const { User } = require("../../db");

const putUserController = async (
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
		const updatedUser = await User.update(
			{
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
			{
				where: { cuit: cuit },
			}
		);

		return updatedUser;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = putUserController;
