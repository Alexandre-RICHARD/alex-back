import type { CreateGameBodyDto } from "@specs/project/gameDeathCounter/endpoint/games/createGame/createGameBody.dto.ts";

import type { CreateGameBean } from "../bean/createGameBean.ts";

export const createGameMapper = {
	fromCreateGameDtoToCreateGameBean: (
		createGame: CreateGameBodyDto,
	): CreateGameBean => {
		return {
			name: createGame.name,
		};
	},
};
