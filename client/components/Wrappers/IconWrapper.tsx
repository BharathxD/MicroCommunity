import { Box, IconButton, useTheme } from "@mui/material";
import React from "react";

const IconWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        borderRadius: "50%",
        background: neutralLight,
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        p: "7.5px",
        cursor: "pointer",
      }}
    >
      {children}
    </Box>
  );
};

export default IconWrapper;
