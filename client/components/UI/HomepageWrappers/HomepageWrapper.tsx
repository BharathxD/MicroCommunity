import { Box } from "@mui/material";
import { ReactNode } from "react";

const HompageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        p: "2%",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {children}
    </Box>
  );
};

export default HompageWrapper;
