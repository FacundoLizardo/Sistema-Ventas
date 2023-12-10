const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"User",
		{
			user_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 50],
				},
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 50],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			address: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			phone_number: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			cuit: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			branch: {
				type: DataTypes.ARRAY(DataTypes.UUIDV4),
				allowNull: true,
			},/*asi un empleado puede tener acceso a varias sucursales*/
			enabled: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true,
				/* Ver tema de seguridad "hashes" */
			},
			role: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
