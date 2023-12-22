const { DataTypes } = require("sequelize");

const Product = (sequelize) => {
	sequelize.define("Product",
		{
			productId: {
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
			finalPrice: {
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
			profitPercentage: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					isPositive(value) {
						if (value <= 0) {
							throw new Error('The profit percentage must be a positive number.');
						}
					}
				}
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			enabled: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			notesDescription: {
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
			barcode: {
				type: DataTypes.STRING,
				allowNull: true,
			}
		},
		{
			timestamps: false,
		}
	);
};

module.exports = Product