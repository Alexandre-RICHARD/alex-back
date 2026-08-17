import type { TestEndpointRegistry } from "@specs/specs.ts";
import { Router as ExpressRouter } from "express";

import { createTypedExpressRouter } from "../../common/routing/createTypedExpressRouter.ts";
import { testController } from "./controller/test.controller.ts";

const expressRouter = ExpressRouter();

const typedRouter =
	createTypedExpressRouter<TestEndpointRegistry>(expressRouter);

typedRouter.GET("/test/test/:id", testController.getOne);
typedRouter.GET("/test/test", testController.getAll);
typedRouter.POST("/test/test", testController.create);
typedRouter.PUT("/test/test/:id", testController.update);
typedRouter.DELETE("/test/test/:id", testController.delete);

export const testRouter = expressRouter;
