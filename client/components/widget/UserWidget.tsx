import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Twitter,
  LinkedIn,
  ManageAccounts,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "../UI/FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReduxState, User } from "@/types/state.types";
import { fetchUserData } from "@/api/user.api";
import IconWrapper from "../UI/IconWrapper";

const UserWidget = () => {
  const userId = useSelector((state: ReduxState) => {
    return state.user?._id;
  });
  const picturePath = useSelector((state: ReduxState) => {
    return state.user?.picturePath;
  });
  const [user, setUser] = useState<User | null>(null);
  const { palette } = useTheme();
  const router = useRouter();
  const token = useSelector((state: ReduxState) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  useEffect(() => {
    const getUserHandler = async () => {
      if (!userId && !token) {
        return;
      }
      const userData = await fetchUserData(userId);
      setUser(userData);
    };
    getUserHandler();
  }, [userId, token]);
  if (!user) {
    return null;
  }
  const {
    fname,
    lname,
    location,
    occupation,
    viewedProfile,
    impressions,
    connections,
  } = user;
  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => router.push(`/profile/${userId}`)}
      >
        <FlexBetween gap="1.25rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              pb="0.25rem"
              sx={{
                "&:hover": {
                  color: palette.neutral.mediumMain,
                  cursor: "pointer",
                },
              }}
            >
              {fname} {lname}
            </Typography>
            <Typography color={medium}>
              {connections.length} Connections
            </Typography>
          </Box>
        </FlexBetween>
        <IconWrapper>
          <ManageAccounts color="action" fontSize="large" />
        </IconWrapper>
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>{"Who's viewed your profile"}</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter color="action" fontSize="large" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <IconWrapper>
            <EditOutlined sx={{ color: main }} />
          </IconWrapper>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn color="action" fontSize="large" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <IconWrapper>
            <EditOutlined sx={{ color: main }} />
          </IconWrapper>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
