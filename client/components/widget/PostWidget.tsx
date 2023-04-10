import { ReduxState } from "@/types/state.types";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  likes: Map<string, boolean>;
};

const PostWidget = ({ likes }: Props) => {
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
  
  return <></>;
};

export default PostWidget;
