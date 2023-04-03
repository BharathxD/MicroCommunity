import { Box, IconButton, useTheme } from "@mui/material";
import SwitchMode from "../SwitchMode";
import NavIcons from "../NavIcons";
import NavbarForm from "../NavbarForm";
import { Close } from "@mui/icons-material";

type Props = {
  setMobileMenuToggled: (arg1: boolean) => void;
  isMobileMenuToggled: boolean;
};

const MobileNav = ({ setMobileMenuToggled, isMobileMenuToggled }: Props) => {
  const theme = useTheme();
  const background = theme.palette.background.default;
  return (
    <Box
      position="absolute"
      top="0px"
      bottom="0px"
      left="0px"
      right="0px"
      zIndex="1"
      sx={{
        background: "rgba( 255, 255, 255, 0.05 )",
        backdropFilter: "blur( 4px )",
      }}
    >
      <Box
        right="0px"
        top="0px"
        left="0px"
        height="15rem"
        zIndex="100"
        position="fixed"
        maxWidth="100%"
        minWidth="300px"
        bgcolor={background}
        border="1px solid rgba( 255, 255, 255, 0.18 )"
        sx={{
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Box display="flex" justifyContent="flex-end" p="1.3rem">
          <IconButton
            onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Close />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="1rem"
        >
          <SwitchMode />
          <NavIcons />
        </Box>
        <Box mt="1rem" width="100%" textAlign="center">
          <NavbarForm />
        </Box>
      </Box>
    </Box>
  );
};

export default MobileNav;
