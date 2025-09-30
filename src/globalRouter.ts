import { Router } from "express";

import { testRouter } from "./project/testing/router.ts";

const globalRouter = Router();

globalRouter.use(testRouter);

export { globalRouter };
