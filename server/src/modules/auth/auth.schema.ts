import { TypeOf, object, string } from "zod";

const LoginSchema = {
  body: object({
    email: string({
      required_error: "Enter a valid email",
    }).includes("@"),
    password: string({
      required_error: "Enter a valid password",
    })
      .min(6, "The length of the password should atleast 6 Characters long")
      .max(
        64,
        "Password is too long, it should not be longer than 64 Characters"
      ),
  }),
};

export type LoginInput = TypeOf<typeof LoginSchema.body>;
