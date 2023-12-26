const { Operation } = require("../../db")

const getOperationsController = async () => {
    try {
        const operations = await Operation.findAll()
        return operations
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = getOperationsController