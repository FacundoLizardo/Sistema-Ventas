/* const { Operation } = require("../../db")

const getOperationsController = async () => {
    try {
        const operations = await Operation.findAll()
        return operations
    } catch (error) {
        throw new Error(`Error while fetching operations: ${error.message}`);
    }
}

module.exports = { getOperationsController } */