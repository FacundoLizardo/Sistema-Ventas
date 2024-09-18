import { Router } from "express";
import CustomerController from "../controllers/CustomerController"

const router = Router();

router.get("/:id", CustomerController.getCustomer);
router.get("/:companyId", CustomerController.getCustomerByDocument);
router.get("/", CustomerController.getCustomers);
router.post("/:companyId", CustomerController.postCustomer);
router.put("/:id", CustomerController.putCustomer);
router.delete("/:id", CustomerController.deleteCustomer);

module.exports = router;
