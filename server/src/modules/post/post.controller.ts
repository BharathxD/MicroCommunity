import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createPostInput } from "./post.schema";
import { findUserById } from "../user/user.service";
import { createPost, getAllPosts } from "./post.service";
import logger from "../../utils/logger";

export const createPostHandler = async (
  req: Request<{}, {}, createPostInput>,
  res: Response
) => {
  try {
    const { userId, description, picturePath } = req.body;
    const foundUser = await findUserById(userId);
    if (!foundUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "User not found" });
    }
    const postBody = {
      userId,
      fname: foundUser.fname,
      lname: foundUser.lname,
      location: foundUser.location,
      description,
      userPicturePath: foundUser.picturePath,
      picturePath,
      likes: new Map<string, boolean>(),
      comments: [],
    };
    const createdPost = await createPost(postBody);
    if (!createdPost) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Couldn't create the post" });
    }
    res.status(StatusCodes.CREATED).send(createdPost);
  } catch (error: any) {
    logger.error(error.message);
  }
};

export const getFeedPostsHandler = async (req: Request, res: Response) => {
  try {
    const post = await getAllPosts();
    res.status(StatusCodes.OK).send(post);
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).send({ message: error.message });
  }
};
