import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetUserPostsInput, createPostInput } from "./post.schema";
import { findUserById } from "../user/user.service";
import {
  UpdatePost,
  createPost,
  getAllPosts,
  getPostById,
  getPostByUserId,
} from "./post.service";
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

export const getUserPostsHandler = async (
  req: Request<GetUserPostsInput["params"]>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const foundPost = await getPostByUserId(userId);
    res.status(StatusCodes.OK).json(foundPost);
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const likePostHandler = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    console.log(req);
    const post = await getPostById(postId);
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Post not Found" });
    }
    //? Check if the user has already liked the post
    const isLiked = post.likes.has(userId);
    if (isLiked) {
      //? If the user has already liked the post, remove the like
      post.likes.delete(userId);
    } else {
      //? If the user hasn't liked the post yet, add the like
      post.likes.set(userId, true);
    }
    const updatedPost = await UpdatePost(
      postId,
      { likes: post.likes },
      { new: true }
    );
    if (!updatedPost) {
      throw new Error("Cannot update the post, try again later");
    }
    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
