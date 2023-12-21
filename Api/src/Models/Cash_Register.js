const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Cash_Register",
        {
            cash_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            initial_amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            final_amount: {
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
            total_cash_register: {
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