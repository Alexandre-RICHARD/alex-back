import type { TestEndpointRegistry } from "@specs/project/test/testEndpointRegistry.type.ts";
import { Router as ExpressRouter } from "express";

import { createTypedExpressRouter } from "../../common/routing/createTypedExpressRouter.ts";
import { testController } from "./controller/test.controller.ts";

const expressRouter = ExpressRouter();

const typedRouter =
	createTypedExpressRouter<TestEndpointRegistry>(expressRouter);

typedRouter.GET("/test/:id", testController.getOne);
typedRouter.GET("/test", testController.getAll);
typedRouter.POST("/test", testController.create);
typedRouter.PUT("/test/:id", testController.update);
typedRouter.DELETE("/test/:id", testController.delete);

export const testRouter = expressRouter;
