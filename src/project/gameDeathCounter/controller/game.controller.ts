import type { CreateGame } from "@specs/project/gameDeathCounter/endpoint/games/createGame.endpoint.ts";
import { HttpStatutCodeSuccessEnum } from "@specs/specUtils/httpStatutCodeSuccess.enum.ts";

import { asyncRequestHandler } from "../../../common/routing/asyncRequestHandler.ts";
import { gameMapper } from "../mapper/game.mapper.ts";
import { createGame } from "../service/game/createGame.ts";

export const gameController = {
	create: asyncRequestHandler<CreateGame>(async (request, response) => {
		const { name } = request.body;

		const game = await createGame({ name });

		return response
			.status(HttpStatutCodeSuccessEnum.CREATED)
			.json(gameMapper.fromGameSummaryBeanToGameSummaryDto(game));
	}),
};
