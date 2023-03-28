import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { connect, disconnect } from "./utils/connect";
import { configureApp } from "./config/config";
import routes from "./routes";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

/* CONFIGURATION */
configureApp(app);

const server = app.listen(PORT, async () => {
  logger.info(`The server is running at http://localhost:${PORT}`);
  await connect();
  routes(app);
});

const SIGNALS = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal: string) => {
  process.once(signal, async () => {
    console.log(`Recieved ${signal}, implementing graceful shutdown...`);
    try {
      await Promise.all([
        new Promise((reject, resolve) => {
          server.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }),
        disconnect(),
      ]);
      console.log(`Shutdown Completed`);
      process.exit(0);
    } catch (error: any) {
      console.log(`Something went wrong: `, error.message);
      process.exit(1);
    }
  });
};

for (const SIGNAL in SIGNALS) {
  gracefulShutdown(SIGNAL);
}
