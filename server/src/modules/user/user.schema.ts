import { TypeOf, array, object, string } from "zod";
import { User } from "./user.model";

const UserSchema = {
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
    picturePath: string({
      required_error: "Picture path is invalid",
    }),
    connections: array(string({})),
    location: string({}).optional(),
    occupation: string({}).optional(),
  }),
};

export type RegisterInput = TypeOf<typeof UserSchema.body>;
