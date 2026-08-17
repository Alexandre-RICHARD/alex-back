import type { CreateGame } from "@specs/projects/gameDeathCounter/endpoint/games/createGame/createGame.endpoint.ts";
import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";
import { HttpStatutCodeSuccessEnum } from "@specs/specUtils/httpStatutCodeSuccess.enum.ts";

import { asyncRequestHandler } from "../../../common/routing/asyncRequestHandler.ts";
import { DatabaseError } from "../../../error/DatabaseError.ts";
import { createGameMapper } from "../mapper/createGame.mapper.ts";
import { gameMapper } from "../mapper/game.mapper.ts";
import { createGameService } from "../service/game/createGame.service.ts";

export const gameController = {
	create: asyncRequestHandler<CreateGame>(async (request, response) => {
		const { body } = request;

		try {
			const createGameBean =
				createGameMapper.fromCreateGameDtoToCreateGameBean(body);

			const game = await createGameService(createGameBean);

			return response
				.status(HttpStatutCodeSuccessEnum.CREATED)
				.json(gameMapper.fromGameSummaryBeanToGameSummaryDto(game));
		} catch (error) {
			if (error instanceof DatabaseError) {
				return response.status(HttpStatutCodeErrorEnum.BAD_REQUEST).json(null);
			}
			throw error;
		}
	}),
};
