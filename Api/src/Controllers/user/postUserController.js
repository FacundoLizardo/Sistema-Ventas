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

//////////////////////////// modelo de usario para probar ruta /////////////////////////////
// {
//     "firstName": "John",
//     "lastName": "Doe",
//     "email": "john.doe@example.com",
//     "address": "123 Main St",
//     "phoneNumber": "555-1234",
//     "cuit": "123456789",
//     "branch": ["e4bf1f1d-0a33-4c02-a4e4-4a97cd3405d2", "f4bf1f1d-0a33-4c02-a4e4-4a97cd3405d2"],
//     "enabled": true,
//     "role": "admin"
//   }

module.exports = postUserController;
