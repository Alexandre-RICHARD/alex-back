import { Router } from "express";

import { errorLogRouter } from "./project/errorLog/router.ts";
import { gameDeathCounterRouter } from "./project/gameDeathCounter/router.ts";
import { testRouter } from "./project/testing/router.ts";

const globalRouter = Router();

globalRouter.use(testRouter);
globalRouter.use(errorLogRouter);
globalRouter.use(gameDeathCounterRouter);

export { globalRouter };
