import { object, string, TypeOf } from "zod";

export const postSchema = object({
  userId: string({
    required_error: "Enter a valid User ID",
  }),
  description: string({
    required_error: "Enter a valid Description",
  }),
  picturePath: string({}),
});

export const likePostParams = object({
  postId: string({
    required_error: "Input a valid Post ID",
  }),
});

export const userPostParams = object({
  userId: string({
    required_error: "Product ID is required",
  }),
});

export type LikePostInput = TypeOf<typeof likePostParams>;

export type GetUserPostsInput = TypeOf<typeof userPostParams>;

export type CreatePostInput = TypeOf<typeof postSchema>;
