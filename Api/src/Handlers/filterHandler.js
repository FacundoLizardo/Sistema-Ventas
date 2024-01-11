const { getFilterController } = require("../Controllers/filter/getFilterController");

const getFilter = async (req, res) => {
    const { query, category, page } = req.query;
    const pageSize = 5;
    const pageNumber = page || 1;

    try {
        const products = await getFilterController({ query, category, pageSize, pageNumber });
        res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { getFilter };
