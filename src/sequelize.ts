import { Sequelize } from "sequelize";

const database = process.env.DB_DATABASE_NAME;
const username = process.env.DB_USER_NAME;
const password = process.env.DB_USER_PASSWORD;

export const sequelize = new Sequelize(database, username, password, {
	dialect: "mariadb",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	define: {
		underscored: true,
		charset: "utf8mb4",
		collate: "utf8mb4_unicode_520_ci",
	},
	pool: {
		max: 10,
		idle: 30000,
		acquire: 60000,
	},
});
