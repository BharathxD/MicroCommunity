import { useState } from "react";
import Search from "./Search";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";
import FlexBetween from "@/components/UI/FlexBetween";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header = () => {
  const [isMobileMenuToggled, setMobileMenuToggled] = useState<boolean>();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const alt = theme.palette.background.alt;

  return (
    <>
      <FlexBetween padding="1rem 6%" bgcolor={alt}>
        <FlexBetween gap="1.75rem">
          <Logo />
          {isNonMobileScreens && <Search />}
        </FlexBetween>
        {isNonMobileScreens && <DesktopNav />}
        {!isNonMobileScreens && (
          <IconButton
            onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <MobileNav
            setMobileMenuToggled={setMobileMenuToggled}
            isMobileMenuToggled={isMobileMenuToggled}
          />
        )}
      </FlexBetween>
    </>
  );
};

export default Header;
