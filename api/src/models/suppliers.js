const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Supplier",
		{
			supplierId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			location: {
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
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: true,
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
			webUrl: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isUrl: {
						args: {
							require_tld: true,
						},
						msg: "You must provide a valid URL. For example http://subdomain.example.net",
					},
				},
			},
			sellers: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
			},
			frecuentProducts: {
				type: DataTypes.ARRAY(DataTypes.UUID),
				allowNull: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
