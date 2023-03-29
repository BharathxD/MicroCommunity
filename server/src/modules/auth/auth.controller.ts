import JWTService from "./auth.utils";
import { LoginInput } from "./auth.schema";
import { Request, Response } from "express";
import { validateUser } from "../user/user.service";
import { StatusCodes } from "http-status-codes";

export const loginHandler = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = validateUser({ email, password });
    if (!user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Invalid login and password" });
    }
    //? Generate Token
    const token = new JWTService().generateToken(user);
    //? Adding the Cookie to response
    res.cookie("accessToken", token, {
      maxAge: 3.154e10, //? 1 Year
      httpOnly: true,
      domain: "localhost", //? Development Environment
      path: "/",
      sameSite: "strict",
      secure: false, //? Development Environment
    });
    return res.status(StatusCodes.OK).send(token);
  } catch (error: any) {
    res
      .send(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
};
