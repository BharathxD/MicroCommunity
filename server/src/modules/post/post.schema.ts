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

export const getUserPostsSchema = object({ ...params });

export type GetUserPostsInput = TypeOf<typeof getUserPostsSchema>;

export type createPostInput = TypeOf<typeof PostSchema.body>;
