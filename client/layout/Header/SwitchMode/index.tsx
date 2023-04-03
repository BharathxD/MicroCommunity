import { setMode } from "@/state/auth";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";

const SwitchMode = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const dark = theme.palette.neutral.dark;
  return (
    <>
      <IconButton onClick={() => dispatch(setMode())}>
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
    </>
  );
};

export default SwitchMode;
