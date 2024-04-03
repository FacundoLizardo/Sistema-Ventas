const { Router } = require("express");
const { loginHandler } = require("../handlers/loginHandler");

const router = Router();

router.get("/", loginHandler);

module.exports = router;
