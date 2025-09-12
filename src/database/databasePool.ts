import mariadb, { type Pool } from "mariadb";

let pool: Pool | null = null;

export function getPool(): Pool {
	const mariaDbVariables = {
		host: process.env.DB_HOST,
		user: process.env.DB_USER_NAME,
		password: process.env.DB_USER_PASSWORD,
		database: process.env.DB_DATABASE_NAME,
		port: parseInt(process.env.DB_PORT, 10),
		connectionLimit: 10,
	};
	pool ??= mariadb.createPool(mariaDbVariables);
	return pool;
}
