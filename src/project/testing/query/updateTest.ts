import { QueryTypes } from "sequelize";

import { dateNow } from "../../../common/date/dateNow.ts";
import { sequelize } from "../../../sequelize.ts";
import { Test } from "../models/models.ts";
import { getOneTest } from "./getOneTest.ts";

type Args = {
	id: number;
	name: string;
	isActive: boolean;
};

export async function updateTest({
	id,
	name,
	isActive,
}: Args): Promise<Test | null> {
	const sql = `
      UPDATE tests
			SET name = :name,
				is_active = :isActive,
				updated_at = :updatedAt
			WHERE id = :id;
    `;

	try {
		await sequelize.query<Test>(sql, {
			model: Test,
			type: QueryTypes.UPDATE,
			replacements: {
				name,
				isActive,
				updatedAt: dateNow(),
				id,
			},
		});
		return await getOneTest({ id });
	} catch (error) {
		throw new Error(error as string);
	}
}
