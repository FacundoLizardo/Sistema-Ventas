const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        "Cart",
        {
            cartId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            totalPrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.0,
                validate: {
                    isDecimal: true,
                },
            }
        },
        {
            timestamps: true,
        }
    )
}
