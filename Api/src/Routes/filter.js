const { Router } = require('Express')
const { getFilter } = require('../Handlers/filterHandler')

const router = Router()

router.get("/", getFilter)

module.exports = router