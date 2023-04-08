import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";
import { setConnections } from "@/state/auth";
import { fetchUserConnections } from "@/api";

const FriendList = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state: ReduxState) => state.token);

  useEffect(() => {
    const getConnections = async () => {
      try {
        const data = await fetchUserConnections(token);
        dispatch(setConnections({ connections: data }));
      } catch (error) {
        console.error(error);
      }
    };
    getConnections();
  }, [dispatch, token]);

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
