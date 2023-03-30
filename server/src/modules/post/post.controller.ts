import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetUserPostsInput, createPostInput } from "./post.schema";
import { findUserById } from "../user/user.service";
import {
  updatePost,
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
    //? Get the post ID and user ID from the request
    const { postId } = req.body;
    const { userId } = req.body;
    console.log(res.locals.user);

    //? Retrieve the post from the database
    const post = await getPostById(postId);
    if (!post) {
      //? If the post is not found, return an error response
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Post not found",
      });
    }

    //? Check if the user has already liked the post
    const isLiked = post.likes.has(userId);

    //? Update the post's likes based on the user's action
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    //? Save the updated post to the database
    const updatedPost = await updatePost(
      postId,
      { likes: post.likes },
      { new: true }
    );
    if (!updatedPost) {
      //? If the post cannot be updated, throw an error
      throw new Error("Could not update post");
    }

    //? Return a success response with the updated post
    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error: any) {
    //? If an error occurs, return an error response with the message
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
