const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Costumer",
		{
			dni: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				validate: {
					esDNIoPasaporte(value) {
						const dniRegex = /^\d+$/;
						const pasaporteRegex = /^[a-zA-Z0-9]+$/;

						if (!dniRegex.test(value) && !pasaporteRegex.test(value)) {
							throw new Error("The format of the DNI or passport is invalid.");
						}
					},
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 50],
				},
			},
			lastName: {
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
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			dateOfBirth: {
				type: DataTypes.DATE,
				allowNull: true,
				validate: {
					isValidDate(value) {
						if (value && isNaN(Date.parse(value))) {
							throw new Error("Date of birth is not valid.");
						}
					},
				},
			},
			enableDebt: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			timestamps: true,
		}
	);
};
