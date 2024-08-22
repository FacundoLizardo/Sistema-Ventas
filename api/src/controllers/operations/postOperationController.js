/* const { Operation } = require("../../db");

const postOperationController = async (
	products,
	amount,
	discount,
	extraCharge,
	debtAmount,
	local,
	paymentType,
	mercadoPagoId,
	state,
	delivery,
	comments,
	customersId
) => {
	try {
		const isValidProducts = products.every((product) => {
			return (
				typeof product === "object" &&
				product !== null &&
				"quantity" in product &&
				"product" in product &&
				typeof product.quantity === "number" &&
				typeof product.product === "object" &&
				product.product !== null
			);
		});

		if (!isValidProducts) {
			throw new Error(
				`Invalid structure for products. Each product should have 'quantity' and 'product'.`
			);
		}
		const operation = await Operation.create({
			products,
			amount,
			discount,
			extraCharge,
			debtAmount,
			local,
			paymentType,
			mercadoPagoId,
			state,
			delivery,
			comments,
			customersId,
		});

		const operationId = operation.operationId;

		const updateOperation = await Operation.update(
			{ state: "completed" },
			{ where: { operationId: operationId } }
		);

		return updateOperation;
	} catch (error) {
		throw new Error(
			`Error while processing operation creation: ${error.message}`
		);
	}
};

module.exports = { postOperationController };

/*-------------------modelo para testeo ruta --------------------*/

// {
//   "products": [{

//    "quantity":2,
//    "product": {
//        "name": "mani con codigo de barras repetid2",
//        "category": "vinagre",
//        "cost": 20.00,
//        "finalPrice": 72.99,
//        "discount": 0.00,
//        "profitPercentage": 370,
//        "stock": 100,
//        "enabled": true,
//        "notesDescription": "This is an example product description.",
//        "taxes": 5.00,
//        "barcode": "123256789112"
//     }
//   },

//   {
//   "quantity":3,
//   "product": {
//       "name": "mani con codigo de barras repetido",
//       "category": "vinagre",
//       "cost": 20.00,
//       "finalPrice": 72.99,
//       "discount": 0.00,
//       "profitPercentage": 370,
//       "stock": 100,
//       "enabled": true,
//       "notesDescription": "This is an example product description.",
//       "taxes": 5.00,
//       "barcode": "123256789112"
//      }
//     }
//     ],
//     "amount": 79.97,
//     "discount": 5,
//     "extraCharge": 2,
//     "debtAmount": 10.00,
//     "local": 4,
//     "paymentType": "credit",
//     "invoiceNumber": "INV123456",
//     "state": "pending",
//     "isdelivery": true,
//     "deliveryAddress": "123 Main St, Cityville",
//     "customersId": "123",
//     "comments": "Special instructions for delivery"
//   }
