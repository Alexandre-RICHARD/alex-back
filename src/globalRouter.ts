import { Router } from "express";

import { errorLogRouter } from "./projects/errorLog/router.ts";
import { gameDeathCounterRouter } from "./projects/gameDeathCounter/router.ts";
import { testRouter } from "./projects/testing/router.ts";

const globalRouter = Router();

globalRouter.use(testRouter);
globalRouter.use(errorLogRouter);
globalRouter.use(gameDeathCounterRouter);

export { globalRouter };
