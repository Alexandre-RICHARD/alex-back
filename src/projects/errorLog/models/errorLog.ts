import {
	type CreationOptional,
	DataTypes,
	type InferAttributes,
	type InferCreationAttributes,
	Model,
} from "sequelize";

import { sequelize } from "../../../sequelize.ts";

export class ErrorLog extends Model<
	InferAttributes<ErrorLog>,
	InferCreationAttributes<ErrorLog>
> {
	declare id: CreationOptional<number>;
	declare errorType: string;
	declare message: string;
	declare stack: string;
	declare createdAt: CreationOptional<Date>;
}

ErrorLog.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
		},
		errorType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		stack: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "error_log",
		modelName: "ErrorLog",
		timestamps: false,
	},
);
