import { object, string, TypeOf } from "zod";

export const PostSchema = {
  body: object({
    userId: string({
      required_error: "Enter a valid User ID",
    }),
    description: string({
      required_error: "Enter a valid Description",
    }),
    picturePath: string({}),
  }),
};

const params = {
  params: object({
    userId: string({
      required_error: "Product ID is required",
    }),
  }),
};

const LikePostSchema = {
  params: object({
    postId: string({
      required_error: "Input a valid Post ID",
    }),
  }),
  body: object({
    userId: string({
      required_error: "Enter a valid userId",
    }),
  }),
};

export type LikePostInput = TypeOf<typeof LikePostSchema.body>;

export type LikePostParams = TypeOf<typeof LikePostSchema.params>;

export const getUserPostsSchema = object({ ...params });

export type GetUserPostsInput = TypeOf<typeof getUserPostsSchema>;

export type createPostInput = TypeOf<typeof PostSchema.body>;
