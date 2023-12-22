const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Cash_Register",
        {
            cashId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            initialAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            finalAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            income: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            egress: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            totalCashRegister: {
                type: DataTypes.JSONB,
                allowNull: false,
                defaultValue: [],
            }
        },
        {
            timestamps: true,
        }
    );
};