import type { CreateGameBean } from "../../bean/createGameBean.ts";
import type { GameSummaryBean } from "../../bean/gameSummaryBean.ts";
import { insertGame } from "../../query/game/insertGame.ts";

export async function createGame(
	createGameBean: CreateGameBean,
): Promise<GameSummaryBean> {
	return insertGame({ name: createGameBean.name });
}
