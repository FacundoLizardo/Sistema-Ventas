/* const { User } = require("../../db");
const hashPassword = require("../../utils/hashPassword");

const postUserController = async (
	firstName,
	lastName,
	email,
	password,
	address,
	phoneNumber,
	cuit,
	branch,
	enabled,
	role
) => {
	password = await hashPassword(password);
	try {
		await User.build({
			firstName,
			lastName,
			email,
			password,
			address,
			phoneNumber,
			cuit,
			branch,
			enabled,
			role,
		}).validate();

		const [newUser, created] = await User.findOrCreate({
			where: { cuit: cuit },
			defaults: {
				firstName,
				lastName,
				email,
				password,
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
		if (
			error.name === "SequelizeValidationError" ||
			error.name === "SequelizeUniqueConstraintError"
		) {
			return error.errors.map((err) => ({
				field: err.path,
				message: err.message,
			}));
		} else {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}
};

//------------------modelo de usario para probar ruta --------------------//
// {
//     "firstName": "John",
//     "lastName": "Doe",
//     "email": "pepeelposho@example.com",
//     "password": "habiaunavezunavaca",
//     "address": "123 Main St",
//     "phoneNumber": "555-1234",
//     "cuit": "123456789",
//     "branch": ["e4bf1f1d-0a33-4c02-a4e4-4a97cd3405d2", "f4bf1f1d-0a33-4c02-a4e4-4a97cd3405d2"],
//     "enabled": true,
//     "role": "admin"
//   }

module.exports = { postUserController };
 */