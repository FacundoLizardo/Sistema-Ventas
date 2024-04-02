const {Product} = require("../../db");

const putProductController = async (
    productId,
    name,
    category,
    cost,
    finalPrice,
    discount,
    profitPercentage,
    stock,
    allowNegativeStock,
    trackStock,
    minimumStock,
    enabled,
    notesDescription,
    taxes,
    barcode
) => {
    try {
        const existingProduct = await Product.findOne({
            where: {productId: productId},
        });

        if (!existingProduct) {
            throw new Error(`The product whit the id:${productId} does not exist`);
        }
        return await Product.update(
            {
                name,
                category,
                cost,
                finalPrice,
                discount,
                profitPercentage,
                stock,
                allowNegativeStock,
                trackStock,
                minimumStock,
                enabled,
                notesDescription,
                taxes,
                barcode,
            },
            {
                where: {productId: productId},
            }
        );
    } catch (error) {
        throw new Error(`Error when updating product: ${error.message}`);
    }
};

const putProductStockController = async ({productId}) => {
    try {
        const product = await Product.findByPk(productId);

        if (product) {
            await product.update({
                stock: product.stock - 1,
            });
            return true;
        } else {
            throw new Error(`Product with ID ${productId} not found`);
        }
    } catch (error) {
        throw new Error(`Error when updating product stock: ${error.message}`);
    }
};

module.exports = {putProductController, putProductStockController};
