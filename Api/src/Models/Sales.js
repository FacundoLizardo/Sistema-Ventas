const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Sale",
		{
			saleId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			products: {
				type: DataTypes.ARRAY(DataTypes.UUID),
				allowNull: false,
			},
			amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			extraCharge: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			debtAmount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					isFloat: {
						msg: "The debt should be a decimal number.",
					},
					min: {
						args: [0],
						msg: "The amount o debt should be equal or higher than 0.",
					},
				},
			},
			branch: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			paymentType: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isIn: [["credit", "debit", "cash", "mercadoPago"]],
				},
			},
			MercadoPagoId: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isIn: [["completed", "pending", "cancelled", "failed", "voided"]],
				},
			},
			delivery: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			comments: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			customersId: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		},
		{
			timestamps: true,
		}
	);
};
