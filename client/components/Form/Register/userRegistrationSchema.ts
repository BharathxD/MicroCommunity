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
    fname: yup.string().required("required"),
    lname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.mixed(),
  })
  .defined();
