import { Router } from "express";

import { testController } from "./controller/default.controller.ts";

const testRouter = Router();

testRouter.get("/test/all", testController.getAllTests);
testRouter.post("/test/unique/:id", testController.getOneTest);

export { testRouter };
