const { Router } = require("express");
const { readdirSync } = require("fs")
const path = require("path");

const mainRouter = Router();
const PATH_ROUTER = __dirname;

readdirSync(PATH_ROUTER).filter((fileName) => {
        const cleanRouter = path.parse(fileName).name;
        if (cleanRouter !== "index") {
            const moduleRouter = require(`./${cleanRouter}`)
            console.log(`The route is being loaded: /${cleanRouter}`);
            mainRouter.use(`/${cleanRouter}`, moduleRouter)
        }
    }
)

module.exports = mainRouter;
