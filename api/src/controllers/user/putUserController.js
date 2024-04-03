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
		const existingUser = await User.findOne({
			where: { cuit: cuit },
		});

		if (!existingUser) {
			throw new Error(`The user whit the cuit: ${cuit} does not exist`);
		}
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
		throw new Error(`Error updating user: ${error.message}`);
	}
};

module.exports = { putUserController };
