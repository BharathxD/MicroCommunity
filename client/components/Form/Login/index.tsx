import { loginUser } from "@/api";
import { setLogin } from "@/state/auth";
import {
  useTheme,
  useMediaQuery,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormLink } from "../components/FormLink";

type LoginValues = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

type Props = {
  setPageType: (arg1: string) => void;
};

export const LoginForm = ({ setPageType }: Props) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const login = async (
    values: LoginValues,
    onSubmitProps: { resetForm: () => void }
  ) => {
    const response = await loginUser(values);
    onSubmitProps.resetForm();
    if (response) {
      dispatch(
        setLogin({
          user: response.data.user,
          token: response.data.token,
        })
      );
      router.push("/");
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

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Login
              </Button>
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
