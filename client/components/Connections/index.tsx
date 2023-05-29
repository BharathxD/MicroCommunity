import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "@/components/Wrappers/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Connections, ReduxState } from "@/types/state.types";
import { setConnections } from "@/state/auth";
import { fetchUserConnections } from "@/api/user.api";
import ConnectionList from "./ConnectionList";

type Props = {
  userId?: string;
  isProfile?: boolean;
};

const Connections = ({ userId, isProfile = false }: Props) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const user = useSelector((state: ReduxState) => {
    if (state.profile !== null) {
      return state.profile;
    }
    return state.user;
  });
  const token = useSelector((state: ReduxState) => state.token);

  useEffect(() => {
    const getConnections = async () => {
      try {
        const data = await fetchUserConnections(userId && userId);
        dispatch(setConnections({ connections: data }));
      } catch (error) {
        console.error(error);
      }
    };
    getConnections();
    // eslint-disable-next-line
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Connections
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {user &&
          Array.isArray(user.connections) &&
          user.connections.map((connection: Connections, index) => (
            <ConnectionList
              key={`${connection._id}-${index}`}
              connectionId={connection._id}
              name={`${connection.fname} ${connection.lname}`}
              subtitle={connection.location}
              userPicturePath={connection.picturePath}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default Connections;
