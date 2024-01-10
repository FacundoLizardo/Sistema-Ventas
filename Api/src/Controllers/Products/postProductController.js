const { Product } = require("../../db");

const postProductController = async (
	name,
	category,
	cost,
	finalPrice,
	discount,
	profitPercentage,
	stock,
	enabled,
	notesDescription,
	taxes,
	barcode
) => {
	try {
		const [product, created] = await Product.findOrCreate({
			where: { name: name },
			defaults: {
				name,
				category,
				cost,
				finalPrice,
				discount,
				profitPercentage,
				stock,
				enabled,
				notesDescription,
				taxes,
				barcode,
			},
		});

		return created
			? product
			: "Product not created because it already exists or something is wrong, please try again";
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = postProductController;

/*---------------modelo testeo ruta-------------------*/
// {
//
//     "category": "Electrónicos",
//     "cost": 50.00,
//     "finalPrice": 75.00,
//     "discount": 10.00,
//     "profitPercentage": 20,
//     "stock": 100,
//     "enabled": true,
//     "notesDescription": "Descripción de prueba",
//     "taxes": 5.00,
//     "barcode": "123456789012"
//   }
