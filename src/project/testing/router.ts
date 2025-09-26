import { testSpecs } from "@specs/testing/specs/test.specs.ts";
import { zodiosRouter } from "@zodios/express";

import { asyncRequestHandler } from "../../common/asyncRequestHandler.ts";
import { testController } from "./controller/default.controller.ts";

const testRouter = zodiosRouter(testSpecs);

testRouter.get("/test/all", asyncRequestHandler(testController.getAllTests));
testRouter.get("/test/unique", asyncRequestHandler(testController.getOneTest));

export { testRouter };
