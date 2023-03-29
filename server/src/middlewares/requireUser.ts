import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    res.status(StatusCodes.FORBIDDEN);
  }
  return next();
};

export default requireUser;
