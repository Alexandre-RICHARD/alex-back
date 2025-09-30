import { Router } from "express";

import { testController } from "./controller/default.controller.ts";

const testRouter = Router();

testRouter.get("/test/all", testController.getAllTests);
testRouter.get("/test/unique", testController.getOneTest);

export { testRouter };
