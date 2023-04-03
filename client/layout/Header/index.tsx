import { useState } from "react";
import SwitchMode from "./SwitchMode";
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
import FlexBetween from "@/components/UI/FlexBetween";
import Logo from "./Logo";

const Header = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const [setMobileMenuToggled, setIsMobileMenuToggled] = useState<boolean>();
  const isNonMobileScreens = useMediaQuery("min-width: 1000px");
  const theme = useTheme();
  const user = useSelector((state: ReduxState) => state.user);
  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background;
  const alt = theme.palette.background.alt;
  const fullName = `${user?.fname} ${user?.lname}`;
  return (
    <>
      <FlexBetween padding="1rem 6%" bgcolor={alt}>
        <FlexBetween gap="1.75rem">
          <Logo color={primaryLight} />
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Header;
