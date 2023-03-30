import PostModel, { Post } from "./post.model";
import { QueryOptions } from "mongoose";

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

export const getPostById = async (postId: string) => {
  const post = await PostModel.findById(postId);
  return post;
};

export const updatePost = async (
  id: string,
  likes: { likes: Map<string, boolean> },
  options: QueryOptions
) => {
  const updatedPost = await PostModel.findByIdAndUpdate(id, likes, options);
  return updatedPost;
};
