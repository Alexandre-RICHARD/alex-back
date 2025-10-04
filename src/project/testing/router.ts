import type { TestEndpointRegistry } from "@specs/endpoint/testEndpointRegistry.type.ts";
import { Router } from "express";

import { createTypedExpressRouter } from "../../common/createTypedExpressRouter.ts";
import { testController } from "./controller/default.controller.ts";

const expressRouter = Router();

const typedRouter =
	createTypedExpressRouter<TestEndpointRegistry>(expressRouter);

//  Success
typedRouter.GET("/test/get", testController.testGet);
typedRouter.POST("/test/unique/:id", testController.getOneTest);

// Failure
typedRouter.POST("/test/get", testController.testGet);
typedRouter.GET("/test/unique/:id", testController.getOneTest);

export const testRouter = expressRouter;
