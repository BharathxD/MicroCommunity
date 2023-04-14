import path from "path";
import express from "express";
import helmet from "helmet";
import { Express } from "express";
import deserializeUser from "../middlewares/deserializeUser";
import cookieParser from "cookie-parser";
import cors from "cors";

export const configureApp = (app: Express) => {
  const origin1 = process.env.CORS_ORIGIN || "";
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://192.168.52.201:3000", origin1],
      credentials: true,
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );
  app.use(helmet());
  app.use(deserializeUser);
  const publicPath = path.join(__dirname, "..", "..", "public/assets");
  app.use("/public", express.static(publicPath));
};
