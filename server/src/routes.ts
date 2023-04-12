import { Express, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserRoute from "../src/modules/user/user.route";
import AuthRoute from "../src/modules/auth/auth.route";
import PostRoute from "./modules/post/post.route";

const routes = (app: Express) => {
  app.get("/", (_, res: Response) => {
    res
      .status(StatusCodes.OK)
      .send({ message: "The Server is up and running" });
  });
  app.use("/api/user", UserRoute);
  app.use("/api/auth", AuthRoute);
  app.use("/api/post", PostRoute);
};

export default routes;
