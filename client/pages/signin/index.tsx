import HomePageLayout from "@/layout/HomePageLayout";
import { ReactElement } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Form } from "formik";
import Logo from "@/layout/Header/Logo";

const SignIn = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("min-width(1000px)");
  return (
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
    </Box>
  );
};

SignIn.getLayout = function (page: ReactElement) {
  return <HomePageLayout withoutHeader>{page}</HomePageLayout>;
};

export default SignIn;
