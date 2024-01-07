const { Product } = require("../../db")

const postProductController = async (name, category, cost, finalPrice, discount, profitPercentage, stock, enabled, notesDescription, taxes, barcode) => {
    try {
        const [product, created] = await Product.findOrCreate({
            where: { name: name },
            defaults: {
                name, category, cost, finalPrice, discount, profitPercentage, stock, enabled, notesDescription, taxes, barcode
            }
        });

        return created ? product : "Product not created because it already exists or something is wrong, please try again";

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = postProductController;
