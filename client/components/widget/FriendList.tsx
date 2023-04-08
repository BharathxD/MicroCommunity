import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState, User } from "@/types/state.types";
import { setConnections } from "@/state/auth";

type Props = {
  userId: string | undefined;
};

const FriendList = ({ userId }: Props) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state: ReduxState) => state.token);
  const connections = useSelector(
    (state: ReduxState) => state.user?.connections
  );
  const getConnections = async () => {
    const response = await fetch(`http://localhost:4000/api/user/connections`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setConnections({ friends: data }));
  };
  useEffect(() => {
    getConnections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        TODO: Display Connections
      </Box>
    </WidgetWrapper>
  );
};

export default FriendList;
