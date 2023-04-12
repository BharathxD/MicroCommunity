import { Box, IconButton, useTheme } from "@mui/material";
import { Menu } from "@mui/icons-material";

type Props = {
  setMobileMenuToggled: (arg1: boolean) => void;
  isMobileMenuToggled: boolean | undefined;
};

const MenuButton = ({ setMobileMenuToggled, isMobileMenuToggled }: Props) => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  return (
    <IconButton
      onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}
      sx={{
        borderRadius: "10px",
        ml: "10px",
        background: neutralLight,
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      <Menu />
    </IconButton>
  );
};

export default MenuButton;
