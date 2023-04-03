import { useState } from "react";
import Search from "./Search";
import SwitchMode from "./SwitchMode";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FormControl } from "@mui/material";
import {
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
import { setMode, setLogin, setLogout } from "@/state/auth";
import Router from "next/router";
import FlexBetween from "@/components/UI/FlexBetween";
import Logo from "./Logo";
import NavbarForm from "./NavbarForm";
import NavIcons from "./NavIcons";

const Header = () => {
  const [setMobileMenuToggled, setIsMobileMenuToggled] = useState<boolean>();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background;
  const alt = theme.palette.background.alt;

  return (
    <>
      <FlexBetween padding="1rem 6%" bgcolor={alt}>
        <FlexBetween gap="1.75rem">
          <Logo />
          {isNonMobileScreens && <Search />}
        </FlexBetween>
        <FlexBetween gap="2rem">
          {isNonMobileScreens && <SwitchMode />}
          <NavIcons />
          <NavbarForm />
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Header;
