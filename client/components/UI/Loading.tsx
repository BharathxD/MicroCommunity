import { ReduxState } from "@/types/state.types";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Loading = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <Box width={"min-content"} textAlign={"center"}>
        <CircularProgress
          sx={{ color: mode === "dark" ? "#f4f4f4" : "#040404" }}
        />
        <Typography
          fontWeight={600}
          mt="5px"
          color={mode === "dark" ? "#f4f4f4" : "#040404"}
        >
          Loading
        </Typography>
      </Box>
    </Box>
  );
};

export default Loading;
