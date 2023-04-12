import { useState } from "react";
import React from "react";
import Search from "./Search";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";
import FlexBetween from "@/components/UI/FlexBetween";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import MenuButton from "./MenuButton";

const Header = () => {
  const [isMobileMenuToggled, setMobileMenuToggled] = useState<boolean>();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const alt = palette.background.alt;

  return (
    <React.Fragment>
      <FlexBetween
        padding="1rem 6%"
        sx={{
          background: alt,
          backdropFilter: "blur( 10px )",
          borderBottom: "1px solid rgba( 255, 255, 255, 0.1 )",
        }}
      >
        <FlexBetween
          gap="1.75rem"
          marginLeft={isNonMobileScreens ? "0" : ""}
        >
          <Logo />
        </FlexBetween>
        {isNonMobileScreens ? (
          <FlexBetween>
            <Search />
            <DesktopNav />
          </FlexBetween>
        ) : (
          <React.Fragment>
            <MenuButton
              setMobileMenuToggled={setMobileMenuToggled}
              isMobileMenuToggled={isMobileMenuToggled}
            />
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
