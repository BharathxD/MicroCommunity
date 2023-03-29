import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { connect } from "./utils/connect";
import { configureApp } from "./config/config";
import routes from "./routes";
import gracefulShutdown from "./utils/gracefulShutdown";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

/* CONFIGURATION */
configureApp(app);

const server = app.listen(PORT, async () => {
  logger.info(`The server is running at http://localhost:${PORT}`);
  //? Connect to the Database
  await connect();
  //? Routes
  routes(app);
});

const SIGNALS = ["SIGTERM", "SIGINT"];

for (const SIGNAL of SIGNALS) {
  gracefulShutdown(SIGNAL, server);
}
