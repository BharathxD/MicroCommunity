import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
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
    });
    res.status(StatusCodes.CREATED).send(createdUser);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};
