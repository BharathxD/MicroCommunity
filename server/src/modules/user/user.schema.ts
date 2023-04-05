import { TypeOf, array, object, string } from "zod";

export const RegisterSchema = {
  body: object({
    fname: string({
      required_error: "Enter a valid First Name",
    })
      .min(2, "The First Name should be atleast 2 characters long")
      .max(50, "The First Name shouldn't exceed 50 Characters long"),
    lname: string({
      required_error: "Enter a valid Last Name",
    }),
    email: string({
      required_error: "Enter a Valid Email",
    }).includes("@"),
    password: string({
      required_error: "Enter a Valid Password",
    })
      .min(6, "The length of the password should be atleast 6 Characters long")
      .max(
        64,
        "Password is too long, it should not be longer than 64 Characters"
      ),
    confirmPassword: string({
      required_error: "Enter a Valid Confirm Password",
    }),
    picturePath: string({
      required_error: "picturePath path is invalid",
    }),
    connections: array(string({})).optional(),
    location: string({
      required_error: "Enter a valid location",
    }),
    occupation: string({
      required_error: "Enter a valid Occupation",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
};

export const getUserConnectionsSchema = object({
  userId: string({
    required_error: "User ID is required",
  }),
});

export const connectionsSchema = object({
  connectionId: string({
    required_error: "Connection ID is required",
  }),
});

export type GetUserConnectionParams = TypeOf<typeof getUserConnectionsSchema>;

export type HandleConnectionsParams = TypeOf<typeof connectionsSchema>;

export type RegisterInput = Omit<
  TypeOf<typeof RegisterSchema.body>,
  "passwordConfirmation"
>;
