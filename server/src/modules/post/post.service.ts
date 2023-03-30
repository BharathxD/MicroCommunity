import PostModel, { Post } from "./post.model";

export const createPost = async (input: Post) => {
  return await PostModel.create(input);
};

export const getAllPosts = async () => {
  const foundPosts = await PostModel.find();
  return foundPosts;
};
