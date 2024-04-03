const {
  getFilterController,
} = require("../controllers/filter/getFilterController");

const getFilter = async (req, res) => {
  const { query, category, page } = req.query;
  const pageSize = 6;
  const pageNumber = page || 1;

  try {
    const filteredProducts = await getFilterController({
      query,
      category,
      pageSize,
      pageNumber,
    });
    res.status(200).json(filteredProducts);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getFilter };
