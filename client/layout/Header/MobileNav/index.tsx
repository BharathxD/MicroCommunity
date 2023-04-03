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
      left="0px"
      bottom="0px"
      height="100%"
      zIndex="100"
      position="fixed"
      maxWidth="500px"
      minWidth="300px"
      bgcolor={background}
    >
      <Box display="flex" justifyContent="flex-end" p="1.3rem">
        <IconButton onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}>
          <Close />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <SwitchMode />
        <NavIcons />
        <NavbarForm />
      </Box>
    </Box>
  );
};

export default MobileNav;
