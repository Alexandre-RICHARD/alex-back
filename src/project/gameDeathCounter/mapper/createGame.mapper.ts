import type { CreateGameDto } from "@specs/project/gameDeathCounter/dto/game/createGame.dto.ts";

import type { CreateGameBean } from "../bean/createGameBean.ts";

export const createGameMapper = {
	fromCreateGameDtoToCreateGameBean: (
		createGame: CreateGameDto,
	): CreateGameBean => {
		return {
			name: createGame.name,
		};
	},
};
