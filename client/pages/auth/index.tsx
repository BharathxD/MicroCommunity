import React, { ReactElement } from "react";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import HomePageLayout from "@/layout/HomePageLayout";
import Form from "@/components/Form/Form";
import Logo from "@/layout/Header/Logo";

const RegisterUser = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgcolor={theme.palette.background.alt}
      textAlign="center"
      height="100vh"
      p="15px"
    >
      <Logo />
      <Box
        width={isNonMobileScreen ? "40%" : "100%"}
        p={isNonMobileScreen ? "2rem" : "1rem"}
        m="0.25rem"
        borderRadius="1.5rem"
        flexDirection="column"
        bgcolor={theme.palette.background.alt}
      >
        <Form />
      </Box>
    </Box>
  );
};

RegisterUser.getLayout = function (page: ReactElement) {
  return <HomePageLayout withoutHeader>{page}</HomePageLayout>;
};

export default RegisterUser;
