const { Product } = require("../../db");

const getPaginatedProductsController = async (pageNumber, pageSize) => {

    try {
        const offset = (pageNumber - 1) * pageSize;
        const { rows, count } = await Product.findAndCountAll({
            offset,
            limit: pageSize,
        });

        return {
            products: rows,
            totalCount: count,
            currentPage: pageNumber,
            totalPages: Math.ceil(count / pageSize)
        };
    } catch (error) {
        throw new Error(`Error while fetching paginated products: ${error.message}`);
    }
};

module.exports = { getPaginatedProductsController };
