import type { TestEndpointRegistry } from "@specs/endpoint/testEndpointRegistry.type.ts";
import { Router } from "express";

import { createTypedExpressRouter } from "../../common/createTypedExpressRouter.ts";
import { testController } from "./controller/default.controller.ts";

const expressRouter = Router();

const typedRouter =
	createTypedExpressRouter<TestEndpointRegistry>(expressRouter);

typedRouter.GET("/test/get", testController.testGet);
typedRouter.POST("/test/unique/:id", testController.fakePostTest);

export const testRouter = expressRouter;
