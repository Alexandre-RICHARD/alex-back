import { QueryTypes } from "sequelize";

import { sequelize } from "../../../sequelize.ts";
import { Test } from "../models/testTable/models.ts";

export async function getOneTest(): Promise<Test | null> {
	const sql = `
      SELECT *
      FROM tests
      ORDER BY id ASC
			LIMIT 1
    `;

	const rows = await sequelize.query<Test>(sql, {
		mapToModel: true,
		model: Test,
		type: QueryTypes.SELECT,
		plain: true,
	});

	return rows;
}
