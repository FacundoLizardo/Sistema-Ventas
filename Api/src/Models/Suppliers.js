const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Supplier", {
		supplier_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		address: {
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
		phone_number: {
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

		web_url: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isUrl: {
					args: {
						require_tld: true, // no admite por ejemplo http://localhost/
					},
					msg: "You must provide a valid URL. For example http://subdomain.example.net",
				},
			},
		},
		sellers: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: true,
		},
		frecuent_products: {
			type: DataTypes.ARRAY(DataTypes.UUID),
			allowNull: true,
		},

		timestamps: false,
	});
};
