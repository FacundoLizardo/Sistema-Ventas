const { Router } = require("express");
const { postAfip } = require("../handlers/afipHandler");

const router = Router();

router.post("/", postAfip);

module.exports = router;
