import { QueryTypes } from "sequelize";

import { dateNow } from "../../../common/date/dateNow.ts";
import { sequelize } from "../../../sequelize.ts";
import { ErrorLog } from "../models/errorLog.ts";

type Args = {
	errorType: string;
	message: string;
	stack: string;
};

export async function createErrorLog({
	errorType,
	message,
	stack,
}: Args): Promise<ErrorLog | null> {
	const sql = `
      INSERT INTO
			error_log (
				error_type,
				message,
				stack,
				created_at
			)
			VALUES (
				:errorType,
				:message,
				:stack,
				:createdAt
			)
			RETURNING *;
    `;

	try {
		return await sequelize.query<ErrorLog>(sql, {
			mapToModel: true,
			model: ErrorLog,
			type: QueryTypes.SELECT,
			plain: true,
			replacements: {
				errorType,
				message,
				stack,
				createdAt: dateNow(),
			},
		});
	} catch (error) {
		throw new Error(error as string);
	}
}
