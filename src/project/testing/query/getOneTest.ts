import { QueryTypes } from "sequelize";

import { sequelize } from "../../../sequelize.ts";
import { Test } from "../models/Test.ts";

type Args = {
	id: number;
};

export async function getOneTest({ id }: Args): Promise<Test | null> {
	const sql = `
      SELECT t.*
      FROM tests t
			WHERE t.id = :id
			LIMIT 1;
    `;

	try {
		const result = await sequelize.query<Test>(sql, {
			type: QueryTypes.SELECT,
			plain: true,
			mapToModel: true,
			model: Test,
			replacements: { id },
		});

		return result;
	} catch (error) {
		throw new Error(error as string);
	}
}
