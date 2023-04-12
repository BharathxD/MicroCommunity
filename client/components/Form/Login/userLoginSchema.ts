import * as yup from "yup";

export type LoginValues = {
  email: string;
  password: string;
};

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
