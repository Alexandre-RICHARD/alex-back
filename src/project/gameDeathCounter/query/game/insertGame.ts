import { QueryTypes } from "sequelize";

import { dateNow } from "../../../../common/date/dateNow.ts";
import { sequelize } from "../../../../sequelize.ts";
import type { GameSummaryBean } from "../../bean/gameSummaryBean.ts";
import { gameMapper } from "../../mapper/game.mapper.ts";
import { Game } from "../../models/Game.ts";

type Args = {
	name: string;
};

export async function insertGame({ name }: Args): Promise<GameSummaryBean> {
	const sql = `
		INSERT INTO
    game (
      name,
      started_at
    )
		VALUES (
      :name,
      :startedAt
      )
		RETURNING *;
	`;

	const result = await sequelize.query<Game>(sql, {
		mapToModel: true,
		model: Game,
		type: QueryTypes.SELECT,
		plain: true,
		replacements: {
			name,
			startedAt: dateNow(),
		},
	});

	if (!result) {
		throw new Error("insertGame: l'insertion n'a retourné aucune ligne");
	}

	return gameMapper.fromGameEntityToGameSummaryBean(result);
}
