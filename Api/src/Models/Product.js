const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Product",
		{
			product_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 50]
				}
			},
			category: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cost: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			final_price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					isPositive(value) {
						if (value < 0) {
							throw new Error('The discount must be a positive number.');
						} else if (value > 100) {
							throw new Error('The discount must be less than 100.')
						}
					}
				}
			},
			profit_percentage: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			enabled: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			notes_description: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 255]
				}
			},
			taxes: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
		},
		{
			timestamps: false,
		}
	);
};