const getFilterController = async (req) => {
    try {
        const products = await Products
    } catch (error) {
        throw new Error(`Error when filtering products: ${error.message}`);
    }
}
module.exports = { getFilterController }