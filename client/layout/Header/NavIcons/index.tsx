import { ReduxState } from "@/types/state.types";
import { Message, Notifications, Help } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const NavIcons = () => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useTheme();
  const background = mode === "dark" && { color: "#fff" };
  return (
    <>
      <Message sx={{ fontSize: "25px", ...background }} />
      <Notifications sx={{ fontSize: "25px", ...background }} />
      <Help sx={{ fontSize: "25px", ...background }} />
    </>
  );
};

export default NavIcons;
