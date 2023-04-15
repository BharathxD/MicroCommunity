import { patchLike } from "@/api/post.api";
import { setPost } from "@/state/auth";
import { ReduxState } from "@/types/state.types";
import {
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../UI/FlexBetween";
import WidgetWrapper from "../Wrappers/WidgetWrapper";
import Image from "next/image";
import ConnectionList from "../Connections/ConnectionList";

type Props = {
  postId: string;
  likes: Map<string, boolean>;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  comments: string[];
};

const PostWidget = ({
  postId,
  likes,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  comments,
}: Props) => {
  const [hasComments, setHasComments] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state: ReduxState) => state.token);
  const loggedInUserId = useSelector((state: ReduxState) => state.user?._id);
  if (!loggedInUserId) {
    return null;
  }
  const isLiked = Boolean(likes.get(loggedInUserId));
  const likeCount = Object.keys(likes).length;

  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLikeHandler = async () => {
    if (!postId || !token) {
      return;
    }
    const response = await patchLike(postId, token);
    if (response?.status !== 200) {
      return;
    }
    const updatedPost = await response.data;
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <ConnectionList
        connectionId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <Image
          width={100}
          height={100}
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLikeHandler}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setHasComments(!hasComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {hasComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
