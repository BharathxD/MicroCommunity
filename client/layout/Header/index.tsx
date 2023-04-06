import { useState } from "react";
import React from "react";
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
  const {
    palette: {
      background: { alt },
    },
  } = useTheme();

  return (
    <React.Fragment>
      <FlexBetween padding="1rem 6%" bgcolor={alt}>
        <FlexBetween gap="1.75rem">
          <Logo />
          {isNonMobileScreens && <Search />}
        </FlexBetween>
        {isNonMobileScreens ? (
          <DesktopNav />
        ) : (
          <React.Fragment>
            <IconButton
              onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu />
            </IconButton>
            {isMobileMenuToggled && (
              <MobileNav
                setMobileMenuToggled={setMobileMenuToggled}
                isMobileMenuToggled={isMobileMenuToggled}
              />
            )}
          </React.Fragment>
        )}
      </FlexBetween>
    </React.Fragment>
  );
};

export default Header;
