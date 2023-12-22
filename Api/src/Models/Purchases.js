const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Purchase",
		{
			purchaseId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			supplierId: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			products: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: [],
			},
			amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			comments: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 255]
				}
			},
			barcode: {
				type: DataTypes.STRING,
				allowNull: true,
			}
		},
		{
			timestamps: true,
		}
	);
};
