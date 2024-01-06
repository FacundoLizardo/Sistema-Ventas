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

const putProductQuantityController = async ({ productId, quantity }) => {
    try {
        const product = await Product.findByPk(productId)


        if (product) {
         
            await product.update({
                quantity: product.quantity - 1
            }) 
            return true
        
        } else {

            throw new Error(`Product with ID ${productId} not found`)
        
        }

    } catch (error) {
        console.error("Error updating product quantity.")
        throw new Error(error.message)
    }
}

module.exports = { putProductController, putProductQuantityController };
