import type { Dialect } from "sequelize";

export {};

declare global {
	namespace NodeJS {
		type ProcessEnv = {
			LOCAL_PORT: string;
			CORS_ORIGIN: string;
			DB_DRIVER: Dialect;
			DB_HOST: string;
			DB_USER_NAME: string;
			DB_USER_PASSWORD: string;
			DB_DATABASE_NAME: string;
			DB_PORT: string;
		};
	}
}
