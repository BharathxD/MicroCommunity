import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { setMode } from "@/state/auth";
import { ReduxState } from "@/types/state.types";

const SwitchMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: ReduxState) => state.mode);
  const [iconSize, setIconSize] = useState("25px");

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

  return <IconButton onClick={handleModeChange}>{renderModeIcon()}</IconButton>;
};

export default SwitchMode;
