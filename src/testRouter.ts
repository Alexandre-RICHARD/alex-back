import { Router as createRouter } from "express";

import { testController } from "./project/testing/controller/default.controller.ts";

const testRouter = createRouter();

testRouter.post("/test/:id", testController.test);

export { testRouter };
