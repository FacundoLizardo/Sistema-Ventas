import { Router } from "express";
import customerController from "../controllers/customerController"

const router = Router();

router.get("/:id", customerController.getCustomer);
router.get("/", customerController.getCustomerByQuery);
router.get("/", customerController.getCustomers);
router.post("/", customerController.postCustomer);
router.put("/:id", customerController.putCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
