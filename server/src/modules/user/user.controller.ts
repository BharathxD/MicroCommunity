import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser, findUserById, findUsers } from "./user.service";
import {
  GetUserConnectionParams,
  HandleConnectionsParams,
  RegisterInput,
} from "./user.schema";
import logger from "../../utils/logger";
import _, { omit } from "lodash";
import JWTService from "../auth/auth.utils";

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterInput & { prefix: string }>,
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
      occupation,
      location,
    } = req.body;
    const createdUser = await createUser({
      fname,
      lname,
      email: email.toLowerCase(),
      password,
      picturePath: picturePath,
      connections,
      occupation,
      location,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    //? Generate Token
    const jwt = new JWTService();
    const token = jwt.generateToken(createdUser);
    //? Adding the Cookie to response
    res.cookie("accessToken", token, {
      maxAge: 3.154e10, //? 1 Year
      httpOnly: true,
      domain: "localhost", //? Development Environment
      path: "/",
      sameSite: "strict",
      secure: false, //? Development Environment
    });
    return res
      .status(StatusCodes.CREATED)
      .send({ message: "User created successfully", user: createdUser, token });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(StatusCodes.CONFLICT).send({ message: "User already exists" });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
};

export const getUserHandler = async (
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

export const getAllUsersHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await findUsers();
    if (!users) {
      throw new Error("No users found");
    }
    res.status(StatusCodes.OK).json(users);
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const getUserConnectionsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId =
      req.params.userId !== "null" ? req.params.userId : res.locals.user._id;
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
    if (userId === connectionId) {
      return res
        .status(StatusCodes.CONFLICT)
        .send({ message: "Cannot add the connection to self" });
    }
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
    res.status(StatusCodes.OK).send({ message: "Connection Added" });
  } catch (error: any) {
    logger.error(`Something went wrong: ${error.message}`);
  }
};
