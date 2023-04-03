import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";
import { setMode, setLogin } from "@/state/auth";
import Router from "next/router";

const Header = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const [setMobileMenuToggled, setIsMobileMenuToggled] = useState<boolean>();
  const isNonMobileScreens = useMediaQuery("min-width: 1000px");
  const theme = useTheme();
  const light = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  return <></>;
};

export default Header;
