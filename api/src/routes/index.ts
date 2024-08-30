import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";

const mainRouter = Router();
const PATH_ROUTER = __dirname;

readdirSync(PATH_ROUTER).filter((fileName: string) => {
  const cleanRouter = path.parse(fileName).name;
  if (cleanRouter !== "index" && cleanRouter !== "login") {
    const moduleRouter =
      require(`./${cleanRouter}`).default || require(`./${cleanRouter}`);
    // console.log(`The route is being loaded: /${cleanRouter}`);
    mainRouter.use(`/${cleanRouter}`, moduleRouter);
  }
});

export default mainRouter;
