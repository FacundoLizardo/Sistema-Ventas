"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = __importDefault(require("../controllers/customerController"));
const router = (0, express_1.Router)();
router.get("/", customerController_1.default.getCustomers);
router.post("/:companyId", customerController_1.default.postCustomer);
router.put("/:id", customerController_1.default.putCustomer);
router.delete("/:id", customerController_1.default.deleteCustomer);
module.exports = router;
