import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser, findUserById } from "./user.service";
import { v4 as uuidv4 } from 'uuid';
import {
  GetUserConnectionParams,
  HandleConnectionsParams,
  RegisterInput,
} from "./user.schema";
import logger from "../../utils/logger";
import { omit } from "lodash";

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
      picturePath: picturePath + uuidv4(),
      connections,
      location,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    return res
      .status(StatusCodes.CREATED)
      .send({ message: "User created successfully", user: createdUser });
  } catch (error: any) {
    if (error.code === 11000) {
      logger.error(error.code);
      res
        .status(StatusCodes.CONFLICT)
        .send({ message: "User already exists" });
    }
  }
};

export const getUserHandlerHandler = async (
  req: Request<GetUserConnectionParams>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const transformedUser = omit(user.toJSON(), "password");
    res.status(StatusCodes.OK).json(transformedUser);
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const getUserConnectionsHandler = async (_: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const user = await findUserById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not Found" });
    }

    const connections = user.connections;

    if (!connections || connections.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No connections Found" });
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
    logger.error(error.message);
  }
};

export const connectionHandler = async (
  req: Request<HandleConnectionsParams>,
  res: Response
) => {
  try {
    const { connectionId } = req.params;
    const userId = res.locals.user._id;
    const user = await findUserById(userId);
    const connection = await findUserById(connectionId);
    if (!connection || !user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Connection or User not found" });
    }
    if (user.connections?.includes(connectionId)) {
      user.connections = user.connections?.filter((id) => id !== connectionId);
      connection.connections = connection.connections?.filter(
        (id) => id !== userId
      );
    } else {
      user.connections?.push(connectionId);
      connection.connections?.push(userId);
    }
    Promise.all([await user.save(), await connection.save()]);
    res.status(StatusCodes.OK).send({ message: "Ok" });
  } catch (error: any) {
    logger.error(`Something went wrong: ${error.message}`);
  }
};
