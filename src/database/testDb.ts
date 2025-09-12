import { getPool } from "./databasePool.ts";

export async function testDb(): Promise<void> {
	const pool = getPool();
	let connection;
	try {
		connection = await pool.getConnection();
		await connection.ping();
	} finally {
		if (connection) await connection.end();
	}
}
