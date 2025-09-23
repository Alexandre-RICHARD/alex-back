import { DataTypes } from "sequelize";

import { sequelize } from "../sequelizeConnector.ts";

export const Test = sequelize.define("Test", {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	testOne: {
		type: DataTypes.STRING,
		allowNull: true,
	}
});
