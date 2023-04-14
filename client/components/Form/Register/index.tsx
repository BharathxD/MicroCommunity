import { useMediaQuery, Box, TextField, Alert } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { RegisterValues, registerSchema } from "./userRegistrationSchema";
import { FormLink } from "../components/FormLink";
import DropzoneComponent from "../components/Dropzone";
import FormButton from "@/components/UI/FormButton";
import FormWrapper from "@/components/Wrappers/FormWrapper";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state/auth";
import { useRouter } from "next/router";
import { registerUser } from "@/api/auth.api";
import { useState } from "react";

type Props = {
  onPageChange: (newPage: "login" | "register") => void;
};

export const RegisterForm = ({ onPageChange }: Props) => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const router = useRouter();
  const dispatch = useDispatch();
  const [isError, setError] = useState<{
    message: string;
  } | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
      setError(null);
      const response = await registerUser(formData);
      if (response?.status === 201) {
        setLoading(true);
        const { user, token } = response.data;
        dispatch(setLogin({ user, token }));
        onSubmitProps.resetForm();
        router.push("/");
        if (router.pathname === "/") {
          setLoading(false);
        }
      }
    } catch (error: any) {
      setLoading(false);
      setError({
        message: error.message,
      });
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
              <Box mt="-30px">
                <FormButton state={isLoading}>Register</FormButton>
                {isError && (
                  <Box mt="-20px" mb="10px">
                    <Alert severity="error">{isError.message}</Alert>
                  </Box>
                )}
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
