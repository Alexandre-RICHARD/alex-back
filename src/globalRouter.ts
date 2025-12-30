import { Router } from "express";

import { errorLogRouter } from "./project/errorLog/errorLogRouter.ts";
import { testRouter } from "./project/testing/testRouter.ts";

const globalRouter = Router();

globalRouter.use(testRouter);
globalRouter.use(errorLogRouter);

export { globalRouter };
