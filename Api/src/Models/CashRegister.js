const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"CashRegister",
		{
			cashId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			initialAmount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			finalAmount: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			income: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: {
					amount: 0,
					details: "",
				},

			},
			egress: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: {
					amount: 0,
					details: "",
				},

			},

			totalCashRegister: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: [],
			},
			comments: {
				type: DataTypes.STRING,
				defaultValue: "",
				allowNull: true,
			},
		},
		{
			timestamps: true,
		}
	);
};
