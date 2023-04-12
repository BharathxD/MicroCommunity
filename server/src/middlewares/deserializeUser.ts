import { Request, Response, NextFunction } from "express";
import JWTService from "../modules/auth/auth.utils";
import { StatusCodes } from "http-status-codes";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ""
  ).replace(/^Bearer\s/, "");
  if (!accessToken) {
    return next();
  }
  try {
    const decoded = new JWTService().verifyToken(accessToken);
    res.locals.user = decoded;
    return next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid access token" });
  }
};

export default deserializeUser;
