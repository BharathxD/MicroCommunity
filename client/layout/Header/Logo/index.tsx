import { Typography } from "@mui/material";
import Link from "next/link";
import Router from "next/router";

const Logo = ({ color }: { color: string }) => {
  return (
    <Typography
      fontWeight="bold"
      fontSize="clamp(1rem, 2rem, 2.25rem)"
      color="primary"
      onClick={() => Router.push("/")}
      sx={{
        "&hover": {
          color: color,
          cursor: "pointer",
        },
      }}
    >
      MicroCommunity
    </Typography>
  );
};
export default Logo;
