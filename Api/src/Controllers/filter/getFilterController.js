const { Op } = require("sequelize");
const { Product } = require("../../db");

const getFilterController = async ({ query, category, pageSize, pageNumber }) => {

    try {
        const filterConditions = {}

        if (query) {
            filterConditions[Op.or] = [
                {
                    name: {
                        [Op.iLike]: `%${query}%`,
                    },
                },
                {
                    barcode: {
                        [Op.iLike]: `%${query}%`,
                    },
                },
            ];
        }

        if (category) {
            filterConditions.category = {
                [Op.iLike]: `%${category}%`,
            };
        }

        const products = await Product.findAll({
            where: filterConditions,
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
        });

        const totalCount = await Product.count({
            where: filterConditions,
        });

        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            products,
            totalCount,
            currentPage: pageNumber,
            totalPages,
        };

    } catch (error) {
        throw new Error(`Error when filtering products: ${error.message}`);
    }
}

module.exports = { getFilterController };