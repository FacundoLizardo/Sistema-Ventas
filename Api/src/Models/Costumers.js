const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Costumer",
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
							throw new Error('The format of the DNI or passport is invalid.');
						}
					},
				},
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
			date_of_birth: {
				type: DataTypes.DATE,
				allowNull: true,
				validate: {
					isValidDate(value) {
						if (value && isNaN(Date.parse(value))) {
							throw new Error('Date of birth is not valid.');
						}
					},
				},
			},
			enable_debt: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			timestamps: false
		}
	);
};
