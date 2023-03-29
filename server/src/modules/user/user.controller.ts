import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser } from "./user.service";
import { RegisterInput } from "./user.schema";

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
) => {
  try {
    const createdUser = await createUser({
      ...req.body,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    res
      .status(StatusCodes.CREATED)
      .send({ message: "User created successfully", user: createdUser });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(StatusCodes.CONFLICT)
        .send({ message: "User already exists" });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
};
