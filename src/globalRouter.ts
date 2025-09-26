import apiSpecs from "@apiSpecs";
import { zodiosRouter } from "@zodios/express";

import { testRouter } from "./project/testing/router.ts";

const globalRouter = zodiosRouter(apiSpecs);

globalRouter.use(testRouter);

export { globalRouter };
