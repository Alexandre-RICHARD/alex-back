import type { GameSummaryDto } from "@specs/project/gameDeathCounter/dto/game/gameSummary.dto.ts";

import { mapDateToString } from "../../../common/date/mapDateToString.ts";
import { mapNullableDateToStringOrNull } from "../../../common/date/mapNullableDateToStringOrNull.ts";
import type { GameSummaryBean } from "../bean/gameSummaryBean";
import type { Game } from "../models/Game";

export const gameMapper = {
	fromGameEntityToGameSummaryBean: (game: Game): GameSummaryBean => {
		return {
			id: game.id,
			name: game.name,
			startedAt: game.startedAt,
			endedAt: game.endedAt,
			totalDeath: 0, // TODO TOTAL DEATH
		};
	},

	fromGameSummaryBeanToGameSummaryDto: (
		gameSummaryBean: GameSummaryBean,
	): GameSummaryDto => {
		return {
			id: gameSummaryBean.id,
			name: gameSummaryBean.name,
			startedAt: mapDateToString(gameSummaryBean.startedAt),
			endedAt: mapNullableDateToStringOrNull(gameSummaryBean.endedAt),
			totalDeath: gameSummaryBean.totalDeath,
		};
	},
};
