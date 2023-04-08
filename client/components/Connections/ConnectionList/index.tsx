import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setConnections } from "@/state/auth";
import FlexBetween from "../../UI/FlexBetween";
import UserImage from "../../widget/UserImage";
import { Connections, ReduxState } from "@/types/state.types";
import { patchConnectionHandler } from "@/api";

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
  const token = useSelector((state: ReduxState) => state.token);
  const connection = useSelector(
    (state: ReduxState) => state.user?.connections
  );

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
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
                color: palette.primary.light,
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
      <IconButton
        onClick={() => patchConnection()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isConnection ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default ConnectionList;
