const { Router } = require('express')
const { getFilter } = require('../handlers/filterHandler')

const router = Router()

router.get("/", getFilter)

module.exports = router