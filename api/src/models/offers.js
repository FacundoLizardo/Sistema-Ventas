const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Offer",
		{
			offerId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			products: {
				type: DataTypes.ARRAY(DataTypes.UUID),
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			discountPercentage: {
				type: DataTypes.DECIMAL(10, 2),
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
				},
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					isFloat: {
						msg: "The price should be a decimal number.",
					},
					min: {
						args: [0],
						msg: "The price should be equal or higher than 0.",
					},
				},
			},
		},
		{
			timestamps: false,
		}
	);
};
