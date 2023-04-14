import { loginUser } from "@/api/auth.api";
import { setLogin } from "@/state/auth";
import { Alert, Box, TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FormLink } from "../components/FormLink";
import { LoginValues, loginSchema } from "./userLoginSchema";
import FormButton from "@/components/UI/FormButton";
import FormWrapper from "@/components/Wrappers/FormWrapper";
import { useState } from "react";

type Props = {
  onPageChange: (newPage: "login" | "register") => void;
};

export const LoginForm = ({ onPageChange }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isError, setError] = useState<{
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const login = async (
    values: LoginValues,
    onSubmitProps: { resetForm: () => void }
  ) => {
    try {
      setError(null);
      setLoading(true);
      const response = await loginUser(values);
      if (response?.status === 200) {
        onSubmitProps.resetForm();
        const { user, token } = response.data;
        dispatch(setLogin({ user, token }));
        router.push("/");
        if (router.pathname === "/") {
          setLoading(false);
        }
      }
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 401) {
        setError({
          message: "Email or Password is Incorrect",
        });
      } else if (error?.response?.status === 500) {
        setError({
          message: "Something went wrong, try again later.",
        });
      } else {
        setError({
          message:
            "Oops! Looks like our server is having a bit of a nap. Don't worry, we're on it!",
        });
      }
    }
  };

  const handleFormSubmit = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>
  ) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            <Box mt={"-30px"}>
              <FormButton state={loading}>Login</FormButton>
              {isError && (
                <Box mt="-20px" mb="10px">
                  <Alert severity="error">{isError.message}</Alert>
                </Box>
              )}
              <FormLink
                onPageChange={onPageChange}
                resetForm={resetForm}
                pageType="register"
              >
                Dont have an account? Sign Up here.
              </FormLink>
            </Box>
          </FormWrapper>
        </form>
      )}
    </Formik>
  );
};
