import { Router } from "express";

import { errorLogRouter } from "./project/errorLog/router.ts";
import { testRouter } from "./project/testing/Router.ts";

const globalRouter = Router();

globalRouter.use(testRouter);
globalRouter.use(errorLogRouter);

export { globalRouter };
