import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { setMode } from "@/state/auth";
import { ReduxState } from "@/types/state.types";

const SwitchMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: ReduxState) => state.mode);
  const [iconSize, setIconSize] = useState("25px");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const handleModeChange = () => {
    dispatch(setMode());
  };

  const renderModeIcon = () => {
    const isDarkMode = mode === "dark";
    const iconColor = isDarkMode ? "primary" : "neutral.dark";
    return isDarkMode ? (
      <DarkMode sx={{ fontSize: iconSize }} />
    ) : (
      <LightMode sx={{ fontSize: iconSize, color: iconColor }} />
    );
  };

  return (
    <Box
      bgcolor={neutralLight}
      borderRadius="100%"
      sx={{
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      <Tooltip title="Change Mode">
        <IconButton onClick={handleModeChange}>{renderModeIcon()}</IconButton>
      </Tooltip>
    </Box>
  );
};

export default SwitchMode;
