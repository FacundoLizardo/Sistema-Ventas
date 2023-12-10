const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
"Costumer",
		{
            costumer_id: {
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
            purchases: {
				type: DataTypes.ARRAY(DataTypes.UUID),
				allowNull: true,
			},
            enable_debt: {
            type:DataTypes.BOOLEAN,
            defaultValue: false,
            },
		{
			timestamps: false,
		}
	);
};