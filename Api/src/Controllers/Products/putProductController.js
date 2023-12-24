const { Product } = require("../../db");

const putProductController = async (productId, name, category, cost, finalPrice, discount, profitPercentage, quantity, enabled, notesDescription, taxes, barcode) => {
    try {
        const updatedProduct = await Product.update(
            {
                name,
                category,
                cost,
                finalPrice,
                discount,
                profitPercentage,
                quantity,
                enabled,
                notesDescription,
                taxes,
                barcode
            },
            {
                where: { productId: productId }
            }
        );

        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = putProductController;
