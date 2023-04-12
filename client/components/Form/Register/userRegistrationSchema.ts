import * as yup from "yup";

export interface RegisterValues {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  occupation: string;
  picture: File;
}

export const registerSchema = yup
  .object<RegisterValues>({
    fname: yup.string().required("Enter a valid First Name"),
    lname: yup.string().required("Enter a valid Last Name"),
    email: yup
      .string()
      .email("Enter a valid Email")
      .required("Email is Required"),
    password: yup.string().required("Please enter a password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    location: yup.string().required("Please enter the Location"),
    occupation: yup.string(),
    picture: yup.mixed(),
  })
  .defined();
