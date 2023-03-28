import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser } from "./user.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      picturePath,
      connections,
      location,
      occupation,
    } = req.body;
    const createdUser = await createUser({
      fname,
      lname,
      email,
      password,
      picturePath,
      connections,
      location,
      occupation,
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
