const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Branch",
		{
			branchId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			afipId: {
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
			isStorage: {
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
				type: DataTypes.ARRAY(DataTypes.UUID),
				allowNull: true,
			},
			hours: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: true,
			}
		},
		{
			timestamps: true,
		}
	);
};
