import { Express, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserRoute from "../src/modules/user/user.route";
import AuthRoute from "../src/modules/auth/auth.route";

const routes = (app: Express) => {
  app.get("/healthcheck", (_, res: Response) => {
    res.status(StatusCodes.OK).send({ message: "ok" });
  });
  app.use("/api/user", UserRoute);
  app.use("/api/auth", AuthRoute);
};

export default routes;
