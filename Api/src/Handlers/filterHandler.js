const { getFilterController } = require("../Controllers/filter/getFilterController")

const getFilter = async (req, res) => {
    try {

        const products = await getFilterController(req, res)
        res.status(200).json(products)

    } catch (error) {

        return res.status(400).json({ error: error.message })

    }
}

module.exports = { getFilter }