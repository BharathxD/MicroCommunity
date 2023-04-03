import path from "path";
import express from "express";
import helmet from "helmet";
import { Express } from "express";
import deserializeUser from "../middlewares/deserializeUser";
import cookieParser from "cookie-parser";
import cors from "cors";

export const configureApp = (app: Express) => {
  app.use(cookieParser());
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ limit: "30mb", extended: true }));
  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }))
  app.use(helmet());
  const publicPath = path.join(__dirname, "..", "..", "public/assets");
  app.use("/public", express.static(publicPath));
  app.use(deserializeUser);
};
