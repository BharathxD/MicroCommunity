import { Request, Response, NextFunction } from "express";
import JWTService from "../modules/auth/auth.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization || !req.cookies.accessToken) {
    return next();
  }
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ""
  ).replace(/^Bearer\s/, "");
  try {
    const decoded = new JWTService().verifyToken(accessToken);
    res.locals.user = decoded;
  } catch (error: any) {
    res.status(401).json({ message: "Invalid access token" });
  }
};

export default deserializeUser;
