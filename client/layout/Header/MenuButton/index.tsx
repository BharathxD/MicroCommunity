import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

type Props = {
  setMobileMenuToggled: (arg1: boolean) => void;
  isMobileMenuToggled: boolean | undefined;
};

const MenuButton = ({ setMobileMenuToggled, isMobileMenuToggled }: Props) => {
  return (
    <IconButton onClick={() => setMobileMenuToggled(!isMobileMenuToggled)}>
      <Menu />
    </IconButton>
  );
};

export default MenuButton;
