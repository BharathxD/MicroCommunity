import express from "express";
import logger from "./utils/logger";
import { configureApp } from "./config/config";
import { connect } from "./utils/connect";
import routes from "./routes";
import gracefulShutdown from "./config/gracefulShutdown";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

/**
 * Server Configuration
 */

configureApp(app);

const server = app.listen(PORT, async () => {
  logger.info(`The server is running at http://localhost:${PORT}`);
  //? Connect to the Database
  await connect();
  //? Handle Routes
  routes(app);
});

/**
 * Implement Graceful Shutdown
 */

const SIGNALS = ["SIGTERM", "SIGINT"];

SIGNALS.forEach((signal) => {
  gracefulShutdown(signal, server);
});
