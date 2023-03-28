import path from "path";
import express from "express";
import helmet from "helmet";
import { Express } from "express";

export const configureApp = (app: Express) => {
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ limit: "30mb", extended: true }));
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  const publicPath = path.join(__dirname, "..", "..", "public/assets");
  app.use("/public", express.static(publicPath));
};
