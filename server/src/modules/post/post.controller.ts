import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  GetUserPostsInput,
  LikePostInput,
  CreatePostInput,
} from "./post.schema";
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
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  try {
    const { description, picturePath } = req.body;
    const { _id } = res.locals.user
    const foundUser = await findUserById(_id);
    if (!foundUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "User not found" });
    }
    const postBody = {
      userId: _id,
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
    console.log(createdPost);
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
    const posts = await getAllPosts();
    res.status(StatusCodes.OK).send(posts);
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).send({ message: error.message });
  }
};

export const getUserPostsHandler = async (
  req: Request<GetUserPostsInput>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const foundPost = await getPostByUserId(userId);
    if (!foundPost) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: "Not Found" });
    }
    return res.status(StatusCodes.OK).send(foundPost);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

export const likePostHandler = async (
  req: Request<LikePostInput>,
  res: Response
) => {
  try {
    //? Get the post ID and user ID from the request
    const { postId } = req.params;
    const userId = res.locals.user._id;

    if (!userId) {
      return res.send(StatusCodes.UNAUTHORIZED).send({
        message: "You are not authorized to make this operation",
      });
    }

    //? Retrieve the post from the database
    const post = await getPostById(postId);
    if (!post) {
      //? If the post is not found, return an error response
      return res.status(StatusCodes.NOT_FOUND).send({
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
    res.status(StatusCodes.OK).send(updatedPost);
  } catch (error: any) {
    //? If an error occurs, return an error response with the message
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
    });
  }
};
