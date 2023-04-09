import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "100",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0.6573223039215687) 0%)",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
