import { QueryTypes } from "sequelize";

import { sequelize } from "../../../sequelize.ts";
import { Test } from "../models/testTable/models.ts";

export async function getAllTests(): Promise<Test[]> {
	const sql = `
      SELECT *
      FROM tests
      ORDER BY id ASC
    `;

	const rows = await sequelize.query<Test>(sql, {
		mapToModel: true,
		model: Test,
		type: QueryTypes.SELECT,
	});

	return rows;
}
