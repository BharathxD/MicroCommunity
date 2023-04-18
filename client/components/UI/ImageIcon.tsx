import { ImageOutlined } from "@mui/icons-material";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";

type Props = {
  prevState: boolean;
  setHasImage: (arg1: boolean) => void;
};

const ImageIcon = ({ prevState, setHasImage }: Props) => {
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <IconButton
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        minHeight: "contain",
        borderRadius: "1rem",
        border: "1px solid rgba( 255, 255, 255, 0.1 )",
        backgroundColor: palette.neutral.light,
      }}
      onClick={() => setHasImage(!prevState)}
    >
      <ImageOutlined
        sx={{
          color: mediumMain,
          fontSize: isNonMobileScreens ? "2.6rem" : "2rem",
        }}
      />
    </IconButton>
  );
};

export default ImageIcon;
