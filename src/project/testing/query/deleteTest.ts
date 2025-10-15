import { QueryTypes } from "sequelize";

import { sequelize } from "../../../sequelize.ts";
import { Test } from "../models/models.ts";

type Args = {
	id: number;
};

export async function deleteTest({ id }: Args): Promise<Test | null> {
	const sql = `
      DELETE FROM tests t
			WHERE id = :id;
    `;

	try {
		return await sequelize.query<Test>(sql, {
			type: QueryTypes.DELETE,
			plain: true,
			mapToModel: true,
			model: Test,
			replacements: { id },
		});
	} catch (error) {
		throw new Error(error as string);
	}
}
