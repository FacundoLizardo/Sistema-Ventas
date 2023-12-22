const { Product } = require("../../db")

const addProductController = async (name, category, cost, finalPrice, discount, profitPercentage, quantity, enabled, notesDescription, taxes, barcode) => {
    try {
        const newProduct = new Product({
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
        });

        const savedProduct = await newProduct.save();
        return savedProduct
    } catch (error) {
        throw new Error(error.message);
    }


}

module.exports = addProductController