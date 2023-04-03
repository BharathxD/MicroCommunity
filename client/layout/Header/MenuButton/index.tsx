import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

type Props = {
  setMobileMenuToggled: (arg1: boolean) => void;
  isMobileMenuToggled: boolean;
};

const MenuButton = ({ setMobileMenuToggled, isMobileMenuToggled }: Props) => {
  return (
    <IconButton onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}>
      <Menu />
    </IconButton>
  );
};

export default MenuButton;
