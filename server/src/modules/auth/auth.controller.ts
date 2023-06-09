import JWTService from "./auth.utils";
import { LoginInput } from "./auth.schema";
import { Request, Response } from "express";
import { validateUser } from "../user/user.service";
import { StatusCodes } from "http-status-codes";
import logger from "../../utils/logger";

export const loginUserHandler = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    const user = await validateUser({ email, password });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Invalid email and password" });
    }
    //? Generate Token
    const jwt = new JWTService();
    const token = jwt.generateToken(user);
    //? Adding the Cookie to response
    res.cookie("accessToken", token, {
      maxAge: 3.154e10, //? 1 Year
      httpOnly: true,
      domain: "localhost", //? Dev Environment
      path: "/",
      sameSite: "lax",
      secure: false, //? Dev Environment
    });
    // TODO: RESPOND
    return res.status(StatusCodes.OK).send({ user, token });
  } catch (error: any) {
    logger.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const logoutHandler = async (_: Request, res: Response) => {
  // TODO: Clear locals
  res.locals.user = null;
  // TODO: Remove the access token cookie
  res.clearCookie("accessToken", {
    domain: "localhost", //? Dev Environment
    path: "/",
  });
  // TODO: RESPOND
  return res
    .status(StatusCodes.OK)
    .send({ message: "Logged out successfully" });
};
