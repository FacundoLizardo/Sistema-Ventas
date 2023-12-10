const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Sales",
		{
			sale_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			products: {
				type: DataTypes.ARRAY(DataTypes.UUIDV4),
				allowNull: false,
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			extra_charge: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			branch: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			payment_type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isIn: [["credit", "debit", "cash", "mercadoPago"]],
				},
			},
			MP_id: {
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
