import { TypeOf, object, string } from "zod";

const LoginSchema = {
  body: object({
    email: string({
      required_error: "Enter a valid email",
    }).includes("@"),
    password: string({
      required_error: "Enter a valid password",
    }),
  }),
};

export type LoginInput = TypeOf<typeof LoginSchema.body>;
