import "dotenv/config.js";

import apiSpecs from "@apiSpecs";
import { zodiosApp } from "@zodios/express";
import cors from "cors";
import express from "express";

import { globalRouter } from "./api/globalRouter.ts";
import { sequelize } from "./database/sequelizeConnector.ts";

const corsOptions = {
	origin: process.env.CORS_ORIGIN.split("|"),
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
};

const app = zodiosApp(apiSpecs);
app.use(cors(corsOptions));
app.use(express.json());

app.use(globalRouter);

app.use((req, res): void => {
	res.status(404).json({
		error: `Cette route (${req.originalUrl}) n'est pas gérée par le serveur.`,
	});
});

const adress = process.env.LOCAL_ADDRESS;
const port = process.env.LOCAL_PORT;

async function start() {
	await sequelize.authenticate();
	app.listen(port, () => {
		// TODO
		// eslint-disable-next-line no-console
		console.log(
			`API démarré sur \x1b[36mhttp://${adress}:\x1b[1m${port}\x1b[0m`,
		);
	});
}

start().catch((error) => {
	throw new Error(error ? JSON.stringify(error) : "Default error message");
});
