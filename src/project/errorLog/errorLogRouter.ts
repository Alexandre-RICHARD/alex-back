import type { ErrorLogEndpointRegistry } from "@specs/specs.ts";
import { Router as ExpressRouter } from "express";

import { createTypedExpressRouter } from "../../common/routing/createTypedExpressRouter.ts";
import { errorLogController } from "./controller/errorLog.controller.ts";

const expressRouter = ExpressRouter();

const typedRouter =
	createTypedExpressRouter<ErrorLogEndpointRegistry>(expressRouter);

typedRouter.POST("/error", errorLogController.create);

export const errorLogRouter = expressRouter;
