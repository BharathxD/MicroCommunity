import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "@/components/Wrappers/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Connections, ReduxState, User } from "@/types/state.types";
import { setConnections, setUser } from "@/state/auth";
import { fetchAllUsers, fetchUserConnections } from "@/api/user.api";
import ConnectionList from "../Connections/ConnectionList";

const Users = () => {
  const { palette } = useTheme();
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetchAllUsers();
      const data = response;
      setUsers(data);
    };
    fetchUsers();
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
        Users
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {users?.map((connection: Connections, index) => {
          return (
            <ConnectionList
              key={`${connection._id}-${index}`}
              connectionId={connection._id}
              name={`${connection.fname} ${connection.lname}`}
              subtitle={connection.location}
              userPicturePath={connection.picturePath}
              isUserList
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default Users;
