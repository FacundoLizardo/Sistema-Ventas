const { Router } = require("express");
const { loginHandler } = require("../Handlers/loginHandler");

const router = Router();

router.get("/", loginHandler);

module.exports = router;
