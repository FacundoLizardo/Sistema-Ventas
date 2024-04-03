const { CashRegister } = require("../../db");
const { User } = require("../../db");

const postCashRegisterController = async (
	userId,
	initialAmount,
	finalAmount,
	income,
	egress,
	totalCashRegister,
	comments
) => {
	try {
		// Consultar la última instancia de CashRegister
		const lastCashRegister = await CashRegister.findOne({
			order: [["createdAt", "DESC"]], // Ordenar por createdAt en orden descendente para obtener la última instancia
		});

		// Verificar si la última instancia tiene finalAmount diferente de null
		if (lastCashRegister && lastCashRegister.finalAmount === null) {
			throw new Error(
				"Final Amount in the last Cash Register instance cannot be null"
			);
		}
		// Validar que el userId pertenezca a una instancia del modelo User
		const userInstance = await User.findByPk(userId);
		if (!userInstance) {
			throw new Error("User with the provided userId does not exist");
		}
		//Crea una instancia del modelo sin guardarla en la base de datos para validar errores con .validate()
		await CashRegister.build({
			userId,
			initialAmount,
			finalAmount,
			income,
			egress,
			totalCashRegister,
			comments,
		}).validate();

		const newCashRegister = await CashRegister.create({
			userId: userId,
			initialAmount: initialAmount,
			finalAmount: finalAmount,
			income: income,
			egress: egress,
			totalCashRegister: totalCashRegister,
			comments: comments,
		});
		console.log(newCashRegister);

		return newCashRegister;
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
			
			throw new Error(`Validation error(s) occurred: ${JSON.stringify(validationErrors)}`);
		} else {
			throw new Error(`Error while processing Cash Register creation: ${error.message}`);
		}
	}
};
/*-----------------------modelo para testeo de ruta---------------*/
// {

//     "initialAmount": 120.00,
//     "userId": "e4593977-67f1-4211-8279-b59b2eb05c13"

// }

module.exports = { postCashRegisterController };
