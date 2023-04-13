import { ReduxState } from "@/types/state.types";
import { KeyboardCommandKey } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const InputListenerIcon = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const iconTheme = {
    borderRadius: "5px",
    background: neutralLight,
    border:
      mode === "dark"
        ? "1px solid rgba( 255, 255, 255, 0.3 )"
        : "1px solid rgba(0, 0, 0, 0.1)",
    p: "2.5px",
    cursor: "pointer",
    height: "25px",
    width: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 255, 255, 255, 0.10 )",
  };
  return (
    <Box display="flex" m="0">
      <KeyboardCommandKey
        sx={{
          ...iconTheme,
          mr: "4.5px",
        }}
      />
      <Box sx={{ ...iconTheme, fontSize: "1.25rem", fontWeight: "500" }}>K</Box>
    </Box>
  );
};

export default InputListenerIcon;
