import React from "react";
import { useMediaQuery, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import HomePageLayout from "@/layout/HomePageLayout";
import Form from "@/components/Form";
import Logo from "@/layout/Header/Logo";
import { ReactElement } from "react";

const RegisterUser = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const boxWidth = isNonMobileScreen ? "40%" : "100%";
  const boxPadding = isNonMobileScreen ? "2rem" : "1rem";
  const bgColor = theme.palette.background.alt;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
        p: "15px",
        bgcolor: { bgColor },
      }}
    >
      <Logo />
      <Box
        sx={{
          width: boxWidth,
          p: boxPadding,
          m: "0.25rem",
          borderRadius: "1.5rem",
          bgcolor: { bgColor },
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};

RegisterUser.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout withoutHeader>{page}</HomePageLayout>;
};

export default RegisterUser;
