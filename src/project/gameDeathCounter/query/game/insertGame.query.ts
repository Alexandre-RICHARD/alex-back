import { QueryTypes } from "sequelize";

import { dateNow } from "../../../../common/date/dateNow.ts";
import { DatabaseError } from "../../../../error/DatabaseError.ts";
import { handleBaseError } from "../../../../error/handleBaseError.ts";
import { sequelize } from "../../../../sequelize.ts";
import type { CreateGameBean } from "../../bean/createGameBean.ts";
import { Game } from "../../models/Game.ts";

export async function insertGameQuery(
	createGameBean: CreateGameBean,
): Promise<Game> {
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

	try {
		const result = await sequelize.query<Game>(sql, {
			mapToModel: true,
			model: Game,
			type: QueryTypes.SELECT,
			plain: true,
			replacements: {
				name: createGameBean.name,
				startedAt: dateNow(),
			},
		});

		if (result === null) {
			throw new Error("Failed to get new inserted new game in Game table");
		}

		return result;
	} catch (error) {
		await handleBaseError(error);

		throw new DatabaseError("Failed to insert new game in Game table");
	}
}
