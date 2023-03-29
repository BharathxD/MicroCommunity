import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { connect } from "./utils/connect";
import { configureApp } from "./config/config";
import routes from "./routes";
import gracefulShutdown from "./config/gracefulShutdown";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

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

SIGNALS.forEach((signal) => {
  gracefulShutdown(signal, server);
});
