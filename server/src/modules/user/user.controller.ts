import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser, findUserById } from "./user.service";
import { RegisterInput } from "./user.schema";
import logger from "../../utils/logger";

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      picturePath,
      connections,
      location,
    } = req.body;
    const createdUser = await createUser({
      fname,
      lname,
      email,
      password,
      picturePath,
      connections,
      location,
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
        .send({ message: "Something went wrong" });
    }
  }
};

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const getUserConnectionsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const connections = user.connections;

    if (!connections) {
      throw new Error("No connections found");
    }

    const friends = await Promise.all(
      connections.map((id) => findUserById(id))
    );

    const formattedFriends = friends.map((friend) => {
      if (friend !== null && "_id" in friend) {
        const { _id, fname, lname, occupation, location, picturePath } = friend;
        return { _id, fname, lname, occupation, location, picturePath };
      }
      return null;
    });
    res
      .status(StatusCodes.OK)
      .json(formattedFriends.filter((friend) => friend !== null));
  } catch (error: any) {
    logger.error(error);
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};
