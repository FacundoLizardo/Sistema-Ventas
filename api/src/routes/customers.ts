import { Router } from "express";
import customerController from "../controllers/customerController"

const router = Router();

router.get("/", customerController.getCustomers);
router.post("/:companyId", customerController.postCustomer);
router.put("/:id", customerController.putCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
