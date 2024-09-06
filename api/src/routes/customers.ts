import { Router } from "express";
import customerController from "../controllers/CustomerController";

const router = Router();

router.get("/:id", customerController.getCustomer);
router.get("/:dni", customerController.getCustomerByDNI);
router.get("/", customerController.getCustomers);
router.post("/:companyId", customerController.postCustomer);
router.put("/:id", customerController.putCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
