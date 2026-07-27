import type { CreateGameBean } from "../../bean/createGameBean.ts";
import type { GameSummaryBean } from "../../bean/gameSummaryBean.ts";
import { gameMapper } from "../../mapper/game.mapper.ts";
import { insertGameQuery } from "../../query/game/insertGame.query.ts";

export async function createGameService(
	createGameBean: CreateGameBean,
): Promise<GameSummaryBean> {
	const game = await insertGameQuery(createGameBean);

	return gameMapper.fromGameEntityToGameSummaryBean(game);
}
