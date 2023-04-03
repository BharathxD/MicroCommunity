import { Typography, useTheme } from "@mui/material";
import Router from "next/router";

const Logo = () => {
  const theme = useTheme();
  const primaryLight = theme.palette.neutral.light;
  return (
    <Typography
      fontWeight="bold"
      fontSize="clamp(1rem, 2rem, 2.25rem)"
      color="primary"
      onClick={() => Router.push("/")}
      sx={{
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
