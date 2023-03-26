import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send({ message: "ok" });
});

const server = app.listen(PORT, async () => {
  // logger.log(`The server is running at http://localhost:${PORT}`);
  // await connect();
  // routes(app);
});

const SIGNALS = ["SIGINT", "SIGTERM"];

const gracefulshutdown = (signal: string) => {
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
        // disconnect();
      ]);
      console.log(`Shutdown Completed`);
    } catch (error: any) {
      console.log(`Something went wrong: `, error.message);
    }
  });
};

for (const SIGNAL in SIGNALS) {
  // gracefulshutdown(SIGNAL);
}
