/* const {
  getOperationsController,
} = require("../controllers/operations/getOperationsController");
const {
  postOperationController,
} = require("../controllers/operations/postOperationController");
const {
  getOperationByIdController,
} = require("../controllers/operations/getOperationByIdController");
const {
  putOperationController,
} = require("../controllers/operations/putOperationController");

const {
  deleteOperationController,
} = require("../controllers/operations/deleteOperationsController");

const getOperation = async (req, res) => {
  const operationId = req.params.id;
  try {
    const operation = await getOperationByIdController(operationId);
    return res.status(200).json(operation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllOperations = async (req, res) => {
  try {
    const operations = await getOperationsController();
    return res.status(200).json({ success: true, operations });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postOperation = async (req, res) => {
  const {
    products,
    amount,
    discount,
    extraCharge,
    debtAmount,
    local,
    paymentType,
    mercadoPagoId,
    state,
    delivery,
    comments,
    customersId,
  } = req.body;

  try {
    const newSale = await postOperationController(
      products,
      amount,
      discount,
      extraCharge,
      debtAmount,
      local,
      paymentType,
      mercadoPagoId,
      state,
      delivery,
      comments,
      customersId
    );
    return res.status(200).json(newSale);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putOperation = async (req, res) => {
  const operationId = req.params.id;
  const {
    products,
    amount,
    discount,
    extraCharge,
    debtAmount,
    local,
    paymentType,
    mercadoPagoId,
    state,
    delivery,
    comments,
    customersId,
  } = req.body;
  try {
    const updatedOperation = await putOperationController(
      operationId,
      products,
      amount,
      discount,
      extraCharge,
      debtAmount,
      local,
      paymentType,
      mercadoPagoId,
      state,
      delivery,
      comments,
      customersId
    );
    return res.status(200).json(updatedOperation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteOperation = async (req, res) => {
  try {
    const operationId = req.params.id;
    const deletedOperation = await deleteOperationController(operationId);

    return res.status(200).json(deletedOperation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOperation,
  getAllOperations,
  postOperation,
  putOperation,
  deleteOperation,
};
 */