import { Express, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserRoute from "../src/modules/user/user.route";
import AuthRoute from "../src/modules/auth/auth.route";
import PostRoute from "./modules/post/post.route";

const routes = (app: Express) => {
  app.get("/healthcheck", (_, res: Response) => {
    res.status(StatusCodes.OK).send({ message: "ok" });
  });
  app.use("/api/user", UserRoute);
  app.use("/api/auth", AuthRoute);
  app.use("/api/post", PostRoute);
};

export default routes;
