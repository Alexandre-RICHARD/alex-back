import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { routerV1 } from "./api/v1/routerV1.ts";

dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN.split("|"),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/v1", routerV1);

app.use((req, res): void => {
  res.status(404).json({
    error: `Cette route (${req.originalUrl}) n'est pas gérée par le serveur.`,
  });
});

const adress = process.env.LOCAL_ADDRESS;
const port = process.env.LOCAL_PORT;

function start(): void {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API démarré sur http://${adress}:${port}`);
  });
}

start();
