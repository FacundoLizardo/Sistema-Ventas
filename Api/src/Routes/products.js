const Router = require('express')

const router = Router()

router.get("/", () => {
    console.log("Acá va la ruta GET")
})

module.exports = router 