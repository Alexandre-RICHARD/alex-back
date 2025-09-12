import { getPool } from "../database/databasePool.ts";
import { jsonSafe } from "./jsonSafe.ts";

type TEMPTEST = {
	tt_test_table_id: number;
	tt_name: string;
	tt_is_active: number;
};

export async function testAll(): Promise<TEMPTEST[]> {
	const pool = getPool();
	const connection = await pool.getConnection();

	try {
		const rows: TEMPTEST[] = await connection.query(
			"SELECT * FROM tt_test_table",
		);
		return await jsonSafe(rows);
	} finally {
		if (connection) await connection.end();
	}
}
