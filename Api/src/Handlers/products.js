const getProduct = (req, res) => {
    try {

    } catch (error) {
        handlerHttp(res, "ERROR: GET_PRODUCT", error)
    }
}

const getProducts = (req, res) => {
    try {

    } catch (error) {
        handlerHttp(res, "ERROR: GET_PRODUCTS", error)
    }
}

const postProduct = (req, res) => {
    try {

    } catch (error) {
        handlerHttp(res, "ERROR: POST_PRODUCT", error)
    }
}

const putProduct = (req, res) => {
    try {

    } catch (error) {
        handlerHttp(res, "ERROR: PUT_PRODUCT", error)
    }
}

const deleteProduct = (req, res) => {
    try {

    } catch (error) {
        handlerHttp(res, "ERROR: DELETE_PRODUCT", error)
    }
}

module.exports = {
    getProduct,
    getProducts,
    postProduct,
    putProduct,
    deleteProduct
}