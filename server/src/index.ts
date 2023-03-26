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
