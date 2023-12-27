const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Operation",
		{
			operationId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			products: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: [],
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
				allowNull: true,
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
			local: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			paymentType: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "cash",
				validate: {
					isIn: [["credit", "debit", "cash", "mercadoPago"]],
				},
			},
			invoiceNumber: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "pending",
				validate: {
					isIn: [["completed", "pending", "cancelled", "failed", "voided"]],
				},
			},
			isdelivery: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			deliveryAddress: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			customersId: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			comments: {
				type: DataTypes.STRING,
				allowNull: true,
			}
		},
		{
			timestamps: true,
		}
	);
};
