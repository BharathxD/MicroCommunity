import { Box, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

const MiddleSectionWrapper = ({ children }: { children: ReactNode }) => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      sx={{
        flexBasis: isNonMobileScreen ? "42%" : "100%",
        mt: "0",
      }}
    >
      {children}
    </Box>
  );
};

export default MiddleSectionWrapper;
