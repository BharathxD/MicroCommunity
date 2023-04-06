import { loginUser } from "@/api";
import { setLogin } from "@/state/auth";
import { Box, TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FormLink } from "../components/FormLink";
import { LoginValues, loginSchema } from "./userLoginSchema";
import FormButton from "@/components/UI/FormButton";

type Props = {
  setPageType: (setType: string) => void;
};

export const LoginForm = ({ setPageType }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const login = async (
    values: LoginValues,
    onSubmitProps: { resetForm: () => void }
  ) => {
    try {
      const response = await loginUser(values);
      onSubmitProps.resetForm();
      if (response) {
        const { user, token } = response.data;
        dispatch(setLogin({ user, token }));
        router.push("/");
      }
    } catch (error) {
      console.error(error);
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
          <Box
            m="0.25rem"
            borderRadius="1.5rem"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignContent="flex-start"
          >
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
            <Box>
              <FormButton>Login</FormButton>
              <FormLink
                setPageType={setPageType}
                message="Dont have an account? Sign Up here."
                resetForm={resetForm}
                pageType="register"
              />
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};
