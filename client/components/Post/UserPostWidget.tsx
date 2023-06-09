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
import { createPost } from "@/api/post.api";
import { setPosts } from "@/state/auth";

const UserPostWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const name = useSelector((state: ReduxState) => state.user?.fname);

  const [hasImage, setHasImage] = useState<boolean>(false);
  const [image, setImage] = useState<null | File>(null);
  const [post, setPost] = useState("");

  const { picturePath, mode, token } = useSelector((state: ReduxState) => ({
    picturePath: state.user?.picturePath,
    mode: state.mode,
    token: state.token,
  }));

  const handlePostSubmit = async () => {
    // TODO: Implement post submission logic here
    const formData = new FormData();
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const posts = await createPost(formData);
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper
      sx={{
        padding: "0.75rem",
        borderRadius: "1rem",
      }}
    >
      <FlexBetween gap="0.75rem">
        {isNonMobileScreens && <UserImage image={picturePath} br="1rem" />}
        <Box
          width="100%"
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputBase
            placeholder={`What's on your mind ${name}...`}
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              fontSize: isNonMobileScreens ? "auto" : "0.75rem",
              borderRadius: "1rem",
              padding: isNonMobileScreens ? "1rem 2rem" : "0.5rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              position: "relative",
              height: isNonMobileScreens ? "auto" : "50px",
              mr: "-10px",
            }}
          />
          <ImageIcon prevState={hasImage} setHasImage={setHasImage} />
        </Box>
        <Button
          onClick={handlePostSubmit}
          sx={{
            color: "#f4f4f4",
            backgroundColor: palette.primary.main,
            borderRadius: "1rem",
            height: isNonMobileScreens ? "60px" : "50px",
            padding: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor:
                mode === "dark" ? palette.primary.light : palette.primary.dark,
            },
          }}
        >
          <Send sx={{ fontSize: "2rem" }} />
        </Button>
      </FlexBetween>
      {hasImage && <Divider sx={{ margin: "1rem" }} />}
      <FlexBetween>
        {hasImage && <PostDropzone image={image} setImage={setImage} />}
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserPostWidget;
