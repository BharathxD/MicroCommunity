import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(StatusCodes.FORBIDDEN).send({ message: "This action requires Authentication" });
  }
  return next();
};

export default requireUser;
