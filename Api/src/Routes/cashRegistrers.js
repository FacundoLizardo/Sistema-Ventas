const { Router } = require("express");
const {
	getCashRegistrer,
	getCashRegistrers,
	postCashRegistrer,
	putCashRegistrer,
	deleteCashRegistrer,
} = require("../Handlers/cashRegistrerHandler");
const router = Router();

router.get("/:id", getCashRegistrer);
router.get("/", getCashRegistrers);
router.post("/", postCashRegistrer);
router.put("/:id", putCashRegistrer);
router.delete("/:id", deleteCashRegistrer);

module.exports = router;

// {
//     "cashId": "e2a38f90-7a63-4e2e-8d23-82b6825b95f5", // Debes proporcionar un UUID válido
//     "initialAmount": 100.00,
//     "finalAmount": 150.00,
//     "income": 50.00,
//     "egress": 0.00,
//     "totalCashRegister": [
//         {
//             "transactionType": "income",
//             "amount": 50.00
//         }
//     ]
// }
