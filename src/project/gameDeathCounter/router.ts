import type { GameDeathCounterEndpointRegistry } from "@specs/specs.ts";
import { Router as ExpressRouter } from "express";

import { createTypedExpressRouter } from "../../common/routing/createTypedExpressRouter.ts";
import { gameController } from "./controller/game.controller.ts";

const expressRouter = ExpressRouter();

const typedRouter =
	createTypedExpressRouter<GameDeathCounterEndpointRegistry>(expressRouter);

typedRouter.POST("/gameDeathCounter/games", gameController.create);

export const gameDeathCounterRouter = expressRouter;
