import {
  useMediaQuery,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { RegisterValues, registerSchema } from "./userRegistrationSchema";
import { FormLink } from "../components/FormLink";
import DropzoneComponent from "../components/Dropzone";
import FormButton from "@/components/UI/FormButton";
import FormWrapper from "@/components/UI/FormWrapper";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state/auth";
import { useRouter } from "next/router";
import { registerUser } from "@/api";
import { useState } from "react";
import CircularIndeterminate from "@/components/UI/LoadingScreen";

type Props = {
  onPageChange: (newPage: "login" | "register") => void;
};

export const RegisterForm = ({ onPageChange }: Props) => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const router = useRouter();
  const dispatch = useDispatch();
  const [isError, setError] = useState<boolean>(false);
  const initialValuesRegister = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    occupation: "",
    picture: "",
  };
  const registerHandler = async (
    {
      fname,
      lname,
      location,
      occupation,
      email,
      password,
      confirmPassword,
      picture,
    }: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    const formData = new FormData();
    formData.set("fname", fname);
    formData.set("lname", lname);
    formData.set("location", location);
    formData.set("occupation", occupation);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    formData.set("picture", picture);
    formData.set("picturePath", picture.name);

    try {
      const data = await registerUser(formData);
      if (data) {
        onSubmitProps.resetForm();
        const { user, token } = data;
        dispatch(setLogin({ user, token }));
        router.push("/");
      } else {
        setError(true);
        throw new Error("Failed to register user.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    try {
      await registerHandler(values, onSubmitProps);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        // @ts-ignore
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fname}
                name="fname"
                error={Boolean(touched.fname) && Boolean(errors.fname)}
                helperText={touched.fname && errors.fname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lname}
                name="lname"
                error={Boolean(touched.lname) && Boolean(errors.lname)}
                helperText={touched.lname && errors.lname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
              />
              <DropzoneComponent
                setFieldValue={setFieldValue}
                pictureName={values.picture.name}
              />
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
              <Box
                width="100%"
                display="flex"
                gap="15px"
                flexDirection={isNonMobile ? "row" : "column"}
              >
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={
                    Boolean(touched.confirmPassword) &&
                    Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              {isError && (
                <Alert severity="error">
                  This is an error alert — check it out!
                </Alert>
              )}
              <Box>
                <FormButton>Register</FormButton>
                <FormLink
                  onPageChange={onPageChange}
                  resetForm={resetForm}
                  pageType="login"
                >
                  Already have an account? Sign In here.
                </FormLink>
              </Box>
            </FormWrapper>
          </form>
        )}
      </Formik>
    </>
  );
};
