const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Product",
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
                    len: [0, 50],
                },
            },
            category: {
            	type: DataTypes.STRING,
            	allowNull: false,
            },
            cost: {
            	type: DataTypes.INTEGER,
            	allowNull: true,
            	validate: {
            		isPositive(value) {
            			if (value < 0) {
            				throw new Error("The cost must be a positive number.");
            			}
            		},
            	},
            },
            finalPrice: {
            		type: DataTypes.INTEGER,
            	allowNull: true,
            	validate: {
            		isPositive(value) {
            			if (value < 0) {
            				throw new Error("The cost must be a positive number.");
            			}
            		},
            	},
            },
            discount: {
            	type: DataTypes.INTEGER,
            	allowNull: true,
            	validate: {
            		isPositive(value) {
            			if (value < 0) {
            				throw new Error("The discount must be a positive number.");
            			} else if (value > 10000) {
            				throw new Error("The discount must be less than 10000.");
            			}
            		},
            	},
            },
            profitPercentage: {
            	type: DataTypes.INTEGER,
            	allowNull: true,
            	validate: {
            		isPositive(value) {
            			if (value < 0) {
            				throw new Error("The discount must be a positive number.");
            			} else if (value > 10000) {
            				throw new Error("The discount must be less than 10000.");
            			}
            		},
            	},
            },
            stock: {
            	type: DataTypes.INTEGER,
            	allowNull: false,
            	defaultValue: 0
            },
            allowNegativeStock: {
            	type: DataTypes.BOOLEAN,
            	allowNull: false,
            	defaultValue: true,
            },
            trackStock: {
            	type: DataTypes.BOOLEAN,
            	allowNull: false,
            	defaultValue: true,
            },
            minimumStock: {
            	type: DataTypes.INTEGER,
            	allowNull: false,
            	defaultValue: 0,
            },
            enabled: {
            	type: DataTypes.BOOLEAN,
            	allowNull: false,
            },
            notesDescription: {
            	type: DataTypes.STRING,
            	allowNull: true,
            	validate: {
            		len: [0, 255],
            	},
            },
            taxes: {
            		type: DataTypes.INTEGER,
            	allowNull: true,
            	validate: {
            		isPositive(value) {
            			if (value < 0) {
            				throw new Error("The discount must be a positive number.");
            			} else if (value > 10000) {
            				throw new Error("The discount must be less than 10000.");
            			}
            		},
            	}
            },
            barcode: {
            	type: DataTypes.STRING,
            	allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    );
};
