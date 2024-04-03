const { Costumer } = require("../../db");

const postCostumersController = async (
	dni,
	firstName,
	lastName,
	email,
	address,
	phoneNumber,
	dateOfBirth,
	enableDebt
) => {
	try {
		//Crea una instancia del modelo sin guardarla en la base de datos para validar errores con .validate()
		await Costumer.build({
			dni,
			firstName,
			lastName,
			email,
			address,
			phoneNumber,
			dateOfBirth,
			enableDebt,
		}).validate();

		const [costumer, created] = await Costumer.findOrCreate({
			where: { dni: dni },
			defaults: {
				firstName,
				lastName,
				email,
				address,
				phoneNumber,
				dateOfBirth,
				enableDebt,
			},
		});

		return created
			? costumer
			: "Costumer not created because it already exists or something is wrong, please try again";
	} catch (error) {
		// Captura las excepciones de validación y retorna los mensajes de error
		if (
			error.name === "SequelizeValidationError" ||
			error.name === "SequelizeUniqueConstraintError"
		) {
			const validationErrors = error.errors.map((err) => ({
				field: err.path,
				message: err.message,
			}));

			throw new Error(
				`Validation error(s) occurred: ${JSON.stringify(validationErrors)}`
			);
		} else {
			throw new Error(
				`Error while processing costumer creation: ${error.message}`
			);
		}
	}
};
module.exports = { postCostumersController };

/*-----------------------modelo para testeo de ruta---------------*/
// {
//     "dni": "123456789",
//     "firstName": "John",
//     "lastName": "Doe",
//     "email": "john.doe@example.com",
//     "address": "123 Main Street",
//     "phoneNumber": "555-1234",
//     "dateOfBirth": "1990-01-01",
//     "enableDebt": false
//   }
