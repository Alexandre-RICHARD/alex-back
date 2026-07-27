import type { GameDeathCounterEndpointRegistry } from "@specs/specs.ts";
import { Router as ExpressRouter } from "express";

import { createTypedExpressRouter } from "../../common/routing/createTypedExpressRouter.ts";
import { requestBodyValidator } from "../../middleware/requestBodyValidator.ts";
import { gameController } from "./controller/game.controller.ts";
import { createGameSchema } from "./schemaValidator/game/createGame.schema.ts";

const expressRouter = ExpressRouter();

const typedRouter =
	createTypedExpressRouter<GameDeathCounterEndpointRegistry>(expressRouter);

typedRouter.POST(
	"/gameDeathCounter/games",
	gameController.create,
	requestBodyValidator(createGameSchema),
);

export const gameDeathCounterRouter = expressRouter;
