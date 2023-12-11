const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Purchases",
		{
			purchase_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			supplier_id: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			products: {
				type: DataTypes.ARRAY(DataTypes.UUIDV4),
				allowNull: false,
			},
			amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			comment: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: true,
		}
	);
};
