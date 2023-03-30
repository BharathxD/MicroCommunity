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

export type createPostInput = TypeOf<typeof PostSchema.body>;
