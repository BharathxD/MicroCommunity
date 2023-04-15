import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Send } from "@mui/icons-material";

import WidgetWrapper from "../Wrappers/WidgetWrapper";
import FlexBetween from "../UI/FlexBetween";
import UserImage from "../User/UserImage";
import PostDropzone from "./PostDropzone";
import ImageIcon from "../UI/ImageIcon";

import { ReduxState } from "@/types/state.types";

const UserPostWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [hasImage, setHasImage] = useState<boolean>(false);
  const [image, setImage] = useState<null | File>(null);
  const [post, setPost] = useState("");

  const { picturePath, mode } = useSelector((state: ReduxState) => ({
    picturePath: state.user?.picturePath,
    mode: state.mode,
  }));

  const handlePostSubmit = async () => {
    // TODO: Implement post submission logic here
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1rem">
        {isNonMobileScreens && <UserImage image={picturePath} />}
        <Box
          width="100%"
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            mr: "-20px",
          }}
        >
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              fontSize: isNonMobileScreens ? "1rem" : "0.75rem",
              borderRadius: "1rem",
              padding: isNonMobileScreens ? "1rem 2rem" : "0.5rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              position: "relative",
              height: isNonMobileScreens ? "60px" : "50px",
            }}
          />
          <ImageIcon prevState={hasImage} setHasImage={setHasImage} />
        </Box>
        <Divider sx={{ margin: "1.25rem 0" }} />
        <Button
          onClick={handlePostSubmit}
          sx={{
            color: "#f4f4f4",
            backgroundColor: palette.primary.main,
            borderRadius: "15px",
            height: isNonMobileScreens ? "60px" : "50px",
            width: "50px",
            padding: "1rem 2rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor:
                mode === "dark" ? palette.primary.light : palette.primary.dark,
            },
          }}
        >
          <Send />
        </Button>
      </FlexBetween>
      {!hasImage && <Divider sx={{ margin: "1rem" }} />}
      <FlexBetween>
        {!hasImage && <PostDropzone image={image} setImage={setImage} />}
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserPostWidget;
