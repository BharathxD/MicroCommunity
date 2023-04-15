import { ReduxState } from "@/types/state.types";
import { InputBase, useMediaQuery, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../Wrappers/WidgetWrapper";
import FlexBetween from "../UI/FlexBetween";
import UserImage from "../User/UserImage";

const UserPostWidget = () => {
  const dispatch = useDispatch();
  const [hasImage, setHasImage] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const postMessageRef = useRef<HTMLInputElement>(null);
  const { palette } = useTheme();
  const { picturePath } = useSelector((state: ReduxState) => {
    return { picturePath: state.user?.picturePath };
  });
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const handleSubmit = async () => {};
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          ref={postMessageRef}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "1rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserPostWidget;
