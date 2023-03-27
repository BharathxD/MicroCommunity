import { TypeOf, object, string } from "zod";

const RegisterSchema = {
  body: object({
    fname: string({
      required_error: "Enter a valid first name",
    })
      .min(2)
      .max(50),
    lname: string({
      required_error: "Enter a valid last name",
    })
      .min(2)
      .max(50),
    email: string({
      required_error: "Enter a valid email",
    })
      .min(2)
      .includes("@"),
    password: string({
      required_error: "Enter a valid password",
    })
      .min(6, "The length of the password should be atleast 6 Characters long")
      .max(
        64,
        "Password is too long, it should not be longer than 64 Characters"
      ),
    confirmPassword: string({
      required_error: "Passeword confirmation is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};

export type RegisterInput = TypeOf<typeof RegisterSchema.body>;
