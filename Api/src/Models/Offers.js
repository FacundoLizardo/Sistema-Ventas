const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Offer",
		{
			offer_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			products: {
				type: DataTypes.ARRAY(DataTypes.UUIDV4), // Corrección: ARRAY debe recibir solo el tipo de dato dentro de los paréntesis
				allowNull: false,
			},
			image_url: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			discount_percentage: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					isFloat: {
						msg: "The discount should be a decimal number.",
					},
					min: {
						args: [0],
						msg: "The discount should be equal or higher than 0.",
					},
					max: {
						args: [100],
						msg: "The discount should be equal or less than 100.",
					},
					customValidator(value) {
						const decimals = (value.toString().split(".")[1] || "").length;
						if (decimals > 2) {
							throw new Error("The discount can not have more than 2 decimals.");
						}
					},
				},
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					isFloat: {
						msg: "The price should be a decimal number.",
					},
					min: {
						args: [0],
						msg: "The price should be equal or higher than 0.",
					},
					customValidator(value) {
						const decimals = (value.toString().split(".")[1] || "").length;
						if (decimals > 2) {
							throw new Error("The price can not have more than 2 decimals.");
						}
					},
				},
			},
		},
		{
			timestamps: false,
		}
	);
};