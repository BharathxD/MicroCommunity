import FlexBetween from "@/components/UI/FlexBetween";
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
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { EditOutlined } from "@mui/icons-material";
import { registerUser } from "@/api";

type RegisterValues = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  occupation: string;
  picture: File;
};

const registerSchema = yup.object().shape({
  fname: yup.string().required("required"),
  lname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.mixed(),
});

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

type Props = {
  setPageType: (arg1: string) => void;
};

export const RegisterForm = ({ setPageType }: Props) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const registerHandler = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    const formData = new FormData();
    formData.set("fname", values.fname);
    formData.set("lname", values.lname);
    formData.set("location", values.location);
    formData.set("occupation", values.occupation);
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("confirmPassword", values.confirmPassword);
    formData.set("picturePath", values.confirmPassword);
    formData.set("picture", values.picture);
    console.log(formData);
    const response = await fetch("http://localhost:4000/api/user", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    onSubmitProps.resetForm();
    if (response) {
      setPageType("login");
    }
  };
  const handleFormSubmit = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    await registerHandler(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
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
          <Box
            m="0.25rem"
            borderRadius="1.5rem"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
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
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
              sx={{ gridColumn: "span 4" }}
            />
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture.name ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
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
              <Typography
                onClick={() => {
                  setPageType("login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                Dont have an account? Sign Up here.
              </Typography>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};
