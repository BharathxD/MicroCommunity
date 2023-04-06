import * as yup from "yup";

export type LoginValues = {
  email: string;
  password: string;
};

export const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
