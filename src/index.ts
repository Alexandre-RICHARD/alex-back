import "dotenv/config.js";

import cors from "cors";
import express from "express";

import { globalRouter } from "./globalRouter.ts";
import { notFound } from "./middleware/notFound.ts";
import { unhandledMethod } from "./middleware/unhandledMethod.ts";
import { sequelize } from "./sequelize.ts";

const corsOptions = {
	origin: process.env.CORS_ORIGIN.split("|"),
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

const app = express();
app.use(express.json());
app.disable("etag");
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use(unhandledMethod);
app.use(globalRouter);
app.use(notFound);

const adress = process.env.LOCAL_ADDRESS;
const port = process.env.LOCAL_PORT;

async function start() {
	await sequelize.authenticate();

	app.listen(port, () => {
		// TODO S'arranger pour supprimer ce console.log ou en tout cas l'avertissement
		// eslint-disable-next-line no-console
		console.log(
			`API démarré sur \x1b[36mhttp://${adress}:\x1b[1m${port}\x1b[0m`,
		);
	});
}

start().catch((error) => {
	throw new Error(error ? JSON.stringify(error) : "Default error message");
});
