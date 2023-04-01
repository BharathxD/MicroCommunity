import { Request, Response, NextFunction } from "express";
import JWTService from "../modules/auth/auth.utils";
import { StatusCodes } from "http-status-codes";

interface CustomRequest extends Request {
  cookies: {
    accessToken?: string;
  };
}

const deserializeUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    req.headers.authorization?.replace(/^Bearer\s/, "") ||
    req.cookies?.accessToken ||
    "";
  if (!accessToken) return next();
  try {
    const decoded = new JWTService().verifyToken(accessToken);
    res.locals.user = decoded;
    return next();
  } catch (error: any) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: error.message });
  }
};

export default deserializeUser;
