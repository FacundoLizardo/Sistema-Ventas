const { Product } = require("../../db")

const getProductsController = async () => {
    try {
        const products = await Product.findAll();
        return products || [];
    } catch (error) {
        throw new Error(`Error while fetching products: ${error.message}`);
    }
}

const getProductCategoriesController = async () =>{
    try{
        const categories = await Product.findAll({ attributes: ['category'], raw: true, group: ['category'] });
        return categories.map(categoryObj => categoryObj.category);
    }
    catch (error){
    throw new Error(`Error while fetching categories: ${error.message}`)
    }
}

module.exports = { getProductsController,getProductCategoriesController }