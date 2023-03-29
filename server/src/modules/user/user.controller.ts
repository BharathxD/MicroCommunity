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
    res.status(StatusCodes.CREATED).send(createdUser);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};
