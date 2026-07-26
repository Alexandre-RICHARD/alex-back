import {
	type CreationOptional,
	DataTypes,
	type InferAttributes,
	type InferCreationAttributes,
	Model,
} from "sequelize";

import { sequelize } from "../../../sequelize.ts";

export class Game extends Model<
	InferAttributes<Game>,
	InferCreationAttributes<Game>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare startedAt: Date;
	declare endedAt: CreationOptional<Date | null>;
}

Game.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		startedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		endedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "game",
		modelName: "Game",
		timestamps: false,
	},
);
