import path from "path";
import express from "express";
import helmet from "helmet";
import { Express } from "express";
import deserializeUser from "../middlewares/deserializeUser";
import cookieParser from "cookie-parser";
import cors from "cors";

export const configureApp = (app: Express) => {
  const corsOrigin = process.env.CORS_ORIGIN || "";

  app.use(cookieParser());
  app.use(express.json());
  app.use(helmet());
  app.use(deserializeUser);

  const publicPath = path.join(__dirname, "..", "..", "public/assets");
  app.use("/public", express.static(publicPath));

  app.use(
    cors({
      origin: corsOrigin,
      credentials: true,
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );
};

