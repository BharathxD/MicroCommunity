import PostModel, { Post } from "./post.model";
import { QueryOptions } from "mongoose";

export const createPost = async (input: Post) => {
  return await PostModel.create(input);
};

export const getAllPosts = async () => {
  return await PostModel.find();
};

export const getPostByUserId = async (query: string) => {
  return await PostModel.find({ userId: query });
};

export const getPostById = async (postId: string) => {
  return await PostModel.findById(postId);
};

export const updatePost = async (
  id: string,
  likes: { likes: Map<string, boolean> },
  options: QueryOptions
) => {
  return await PostModel.findByIdAndUpdate(id, likes, options);
};
