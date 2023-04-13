import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Router from "next/router";

const Logo = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const letterSpacing = isNonMobileScreens ? "1px" : "";
  const palette = theme.palette;
  const primaryLight = palette.neutral.dark;
  return (
    <Typography
      fontWeight="bold"
      fontSize={isNonMobileScreens ? "2.25rem" : "1.75rem"}
      color={palette.primary.dark}
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
