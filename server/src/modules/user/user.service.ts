import UserModel, { User } from "./user.model";
import _, { omit } from "lodash";

export const createUser = async (user: Omit<User, "comparePassword">) => {
  const createdUser = await UserModel.create(user);
  return omit(createdUser.toJSON(), "password");
};

export const findUsers = async () => {
  const users = await UserModel.find({});
  // console.log(users)
  const usersWithoutPassword = users.map(user => {
    return omit(user.toJSON(), "password");
  });
  return usersWithoutPassword;
}

export const findUserById = async (userId: string) => {
  return await UserModel.findById(userId);
};

export const findUserByEmail = async (email: User["email"]) => {
  return await UserModel.findOne({ email });
};

export const validateUser = async ({
  email,
  password,
}: {
  email: User["email"];
  password: User["password"];
}) => {
  const user = await findUserByEmail(email);
  if (!user) {
    //? User doesn't exist
    return null;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    //? The user is not Valid
    return null;
  }
  return omit(user.toJSON(), "password");
};
