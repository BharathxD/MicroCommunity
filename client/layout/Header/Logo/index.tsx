import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Router from "next/router";

const Logo = () => {
  const theme = useTheme();
  const primaryLight = theme.palette.neutral.light;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const letterSpacing = isNonMobileScreens ? "1px" : "";
  return (
    <Typography
      fontWeight="bold"
      fontSize="clamp(1rem, 1.9rem, 2.25rem)"
      color="primary"
      onClick={() => Router.push("/")}
      sx={{
        letterSpacing,
        "&hover": {
          color: primaryLight,
          cursor: "pointer",
        },
      }}
    >
      MicroCommunity
    </Typography>
  );
};

export default Logo;
