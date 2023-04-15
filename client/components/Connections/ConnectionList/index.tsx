import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setConnections } from "@/state/auth";
import FlexBetween from "../../UI/FlexBetween";
import UserImage from "../../User/UserImage";
import { Connections, ReduxState } from "@/types/state.types";
import { patchConnectionHandler } from "@/api/user.api";
import ConnectionIcon from "@/components/UI/ConnectionIcon";

type Props = {
  connectionId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
};

const ConnectionList = ({
  connectionId,
  name,
  subtitle,
  userPicturePath,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId, connection, token } = useSelector((state: ReduxState) => {
    return {
      userId: state.user?._id,
      connection: state.user?.connections,
      token: state.token,
    };
  });

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isConnection = (connection as Connections[])?.find(
    (connection: Connections) => connection._id === connectionId
  );

  const patchConnection = async () => {
    if (!token) {
      return;
    }
    const data = await patchConnectionHandler(connectionId, token);
    dispatch(setConnections({ connections: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size={55} />
        <Box
          onClick={() => {
            router.push(`/profile/${connectionId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.neutral.mediumMain,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {connectionId !== userId && (
        <ConnectionIcon
          patchConnection={patchConnection}
          isConnection={isConnection}
        />
      )}
    </FlexBetween>
  );
};

export default ConnectionList;
