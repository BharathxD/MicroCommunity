import { ReduxState } from "@/types/state.types";
import { Box, Button, InputBase, useMediaQuery, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../Wrappers/WidgetWrapper";
import FlexBetween from "../UI/FlexBetween";
import UserImage from "../User/UserImage";
import FormButton from "../UI/FormButton";
import { Send, SendOutlined } from "@mui/icons-material";

const UserPostWidget = () => {
  const dispatch = useDispatch();
  const [hasImage, setHasImage] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { picturePath, mode } = useSelector((state: ReduxState) => {
    return { picturePath: state.user?.picturePath, mode: state.mode };
  });
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const handlePostSubmit = async () => {};
  return (
    <WidgetWrapper>
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "1rem",
            padding: "1rem 2rem",
            border: "1px solid rgba( 255, 255, 255, 0.1 )",
          }}
        />
        <Button
          disabled={false}
          onClick={handlePostSubmit}
          sx={{
            color: "#f4f4f4",
            backgroundColor: palette.primary.main,
            borderRadius: "100%",
            height: "60px",
            width: "50px",
            padding: "1rem 2rem",
            border: "1px solid rgba( 255, 255, 255, 0.1 )",
            "&:hover": {
              backgroundColor:
                mode === "dark" ? palette.primary.light : palette.primary.dark,
            },
          }}
        >
          <Send />
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserPostWidget;
