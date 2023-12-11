const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Branch",
		{
			branch_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			afip_id: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			location: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			is_storage: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			enable: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			manager: {
				type: DataTypes.ARRAY(DataTypes.UUIDV4),
				allowNull: true,
			},
			hours: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			phone_number: {
				type: DataTypes.STRING,
				allowNull: true,
			}
		},
		{
			timestamps: true,
		}
	);
};
