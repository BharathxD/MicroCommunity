import React, { ReactElement } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import HomePageLayout from "@/layout/HomePageLayout";
import RegisterForm from "@/components/Form/RegisterForm";
import { Form } from "formik";
import Head from "next/head";
import Logo from "@/layout/Header/Logo";
import LoginForm from "@/components/Form";

const RegisterUser = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("min-width(1000px)");
  return (
    <>
      <Box>
        <Box
          width="100%"
          bgcolor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Logo />
          <Box
            width={isNonMobileScreen ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            bgcolor={theme.palette.background.alt}
          >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
              Welcome to MicroCommunity, a community for CS Grads
            </Typography>
          </Box>
        </Box>
        <LoginForm />
      </Box>
    </>
  );
};

RegisterUser.getLayout = function (page: ReactElement) {
  return <HomePageLayout withoutHeader>{page}</HomePageLayout>;
};

export default RegisterUser;
