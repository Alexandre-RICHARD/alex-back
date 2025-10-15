import { QueryTypes } from "sequelize";

import { dateNow } from "../../../common/date/dateNow.ts";
import { sequelize } from "../../../sequelize.ts";
import { Test } from "../models/models.ts";

type Args = {
	name: string;
};

export async function createTest({ name }: Args): Promise<Test | null> {
	const sql = `
      INSERT INTO
			tests (
				name,
				is_active,
				created_at,
				updated_at
			)
			VALUES (
				:name,
				:isActive,
				:createdAt,
				:updatedAt
			)
			RETURNING *;
    `;

	try {
		return await sequelize.query<Test>(sql, {
			mapToModel: true,
			model: Test,
			type: QueryTypes.SELECT,
			plain: true,
			replacements: {
				name,
				isActive: false,
				createdAt: dateNow(),
				updatedAt: null,
			},
		});
	} catch (error) {
		throw new Error(error as string);
	}
}
