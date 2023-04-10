import { patchLike } from "@/api";
import { setPost } from "@/state/auth";
import { ReduxState } from "@/types/state.types";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  postId: string;
  likes: Map<string, boolean>;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  comments: string;
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

  return <>
  </>;
};

export default PostWidget;
