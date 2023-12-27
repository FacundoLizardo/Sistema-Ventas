const Router = require('express');
const { postAfip } = require('../Handlers/afipHandler');

const router = Router();

router.post("/", postAfip)

module.exports = router;