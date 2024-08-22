/* const { Branch } = require("../../db");

const postBranchController = async (
	afipId,
	name,
	location,
	isStorage,
	enable,
	manager,
	hours,
	phoneNumber
) => {
	try {
		const [branch, created] = await Branch.findOrCreate({
			where: { afipId: afipId },
			defaults: {
				name,
				location,
				isStorage,
				enable,
				manager,
				hours,
				phoneNumber,
			},
		});

		return created
			? branch
			: "Branch not created because it already exists or something is wrong, please try again";
	} catch (error) {
		throw new Error(`Error while processing branch creation: ${error.message}`);
	}
};

//-----------------modelo para probar ruta---------------

// {
//     "afipId": "123456789",
//     "name": "Sucursal Principal",
//     "location": "Ciudad Principal",
//     "isStorage": false,
//     "enable": true,
//     "manager": ["c1d74da3-634a-4d2d-a5a1-72e68d20f0d7", "e3b55df8-871c-4e0b-bf61-9f3a19fd0e99"],
//     "hours": "9:00 AM - 6:00 PM",
//     "phoneNumber": "+1234567890"
//   }

module.exports = { postBranchController };
 */