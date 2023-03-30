import PostModel, { Post } from "./post.model";
import { FilterQuery } from "mongoose";

export const createPost = async (input: Post) => {
  return await PostModel.create(input);
};

export const getAllPosts = async () => {
  const foundPosts = await PostModel.find();
  return foundPosts;
};

export const getPostByUserId = async (query: string) => {
  const post = await PostModel.find({ query });
  return post;
};
