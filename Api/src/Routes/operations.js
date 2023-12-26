const Router = require("express");
const { getOperation, getOperations, postOperation, putOperation, deleteOperation } = require("../Handlers/operationsHandlres");

const router = Router();

router.get("/:id", getOperation)
router.get("/", getOperations)
router.post("/", postOperation)
router.put("/:id", putOperation)
router.delete(":id", deleteOperation)

module.exports = router;