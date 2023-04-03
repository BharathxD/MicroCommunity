import { ReduxState } from "@/types/state.types";
import { Message, Notifications, Help } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";

const NavIcons = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useTheme();
  const background = mode === "dark" && { color: "#fff" };
  return (
    <>
      <IconButton>
        <Message sx={{ fontSize: "25px", ...background }} />
      </IconButton>
      <IconButton>
        <Notifications sx={{ fontSize: "25px", ...background }} />
      </IconButton>
      <IconButton>
        <Help sx={{ fontSize: "25px", ...background }} />
      </IconButton>
    </>
  );
};

export default NavIcons;
