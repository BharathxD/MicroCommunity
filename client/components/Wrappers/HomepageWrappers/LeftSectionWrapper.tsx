import { Box, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

const LeftSectionWrapper = ({ children }: { children: ReactNode }) => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      sx={{
        flexBasis: isNonMobileScreen ? "26%" : "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default LeftSectionWrapper;
