const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Cash_Register",
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
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			finalAmount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			income: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: {
					amount: 0.0,
					details: "",
				},

				validate: {
					validateAmount(value) {
						if (value.amount !== null) {
							const stringValue = value.amount.toString();
							const decimalCount = stringValue.split(".")[1]
								? stringValue.split(".")[1].length
								: 0;
							if (decimalCount > 2 || stringValue.length > 12) {
								throw new ValidationError("Invalid amount for income");
							}
						}
					},
				},
			},
			egress: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: {
					amount: 0.0,
					details: "",
				},

				validate: {
					validateAmount(value) {
						if (value.amount !== null) {
							const stringValue = value.amount.toString();
							const decimalCount = stringValue.split(".")[1]
								? stringValue.split(".")[1].length
								: 0;
							if (decimalCount > 2 || stringValue.length > 12) {
								throw new ValidationError("Invalid amount for egress");
							}
						}
					},
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
