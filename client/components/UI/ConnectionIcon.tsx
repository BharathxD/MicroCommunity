import { IconButton, useTheme } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Connections } from "@/types/state.types";

type Props = {
  patchConnection: () => void;
  isConnection: Connections | undefined;
};

const ConnectionIcon = ({ patchConnection, isConnection }: Props) => {
  const palette = useTheme().palette;
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  return (
    <IconButton
      onClick={() => patchConnection()}
      sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
    >
      {isConnection ? (
        <PersonRemoveOutlined sx={{ color: primaryDark }} />
      ) : (
        <PersonAddOutlined sx={{ color: primaryDark }} />
      )}
    </IconButton>
  );
};

export default ConnectionIcon;
