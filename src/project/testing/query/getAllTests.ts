import { QueryTypes } from "sequelize";

import { sequelize } from "../../../sequelize.ts";
import { Test } from "../models/models.ts";

export async function getAllTests(): Promise<Test[]> {
	const sql = `
      SELECT t.*
      FROM tests t
      ORDER BY t.id ASC;
    `;

	try {
		return await sequelize.query<Test>(sql, {
			type: QueryTypes.SELECT,
			plain: false,
			mapToModel: true,
			model: Test,
		});
	} catch (error) {
		throw new Error(error as string);
	}
}
