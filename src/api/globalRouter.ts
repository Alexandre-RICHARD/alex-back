import apiSpecs from "@apiSpecs";
import { zodiosRouter } from "@zodios/express";

import { otherTestRouter } from "./routers/otherTestRouter.ts";
import { testRouter } from "./routers/testRouter.ts";

const globalRouter = zodiosRouter(apiSpecs);

globalRouter.use(testRouter);
globalRouter.use(otherTestRouter);

export { globalRouter };
