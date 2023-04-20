import { fetchUserData } from "@/api/user.api";
import Connections from "@/components/Connections";
import PostsWidget from "@/components/Post/PostsWidget";
import UserPostWidget from "@/components/Post/UserPostWidget";
import FlexBetween from "@/components/UI/FlexBetween";
import Loading from "@/components/UI/Loading";
import UserImage from "@/components/User/UserImage";
import UserWidget from "@/components/User/UserWidget";
import HompageWrapper from "@/components/Wrappers/HomepageWrappers/HomepageWrapper";
import IconWrapper from "@/components/Wrappers/IconWrapper";
import WidgetWrapper from "@/components/Wrappers/WidgetWrapper";
import HomePageLayout from "@/layout/HomePageLayout";
import { setProfile, setUser } from "@/state/auth";
import { ReduxState, User } from "@/types/state.types";
import {
  ManageAccounts,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Twitter,
  EditOutlined,
  LinkedIn,
} from "@mui/icons-material";
import {
  useMediaQuery,
  Box,
  useTheme,
  Typography,
  Divider,
} from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";
import { NextPageContext } from "next";
import router, { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  user: User;
};

const ProfilePage = ({ user }: Props) => {
  const { userId } = useRouter().query;
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const { palette } = useTheme();

  if (!user) {
    return (
      <Box bgcolor={palette.background.default} minHeight={"100vh"}>
        <Loading />;
      </Box>
    );
  }

  return (
    <Box
      bgcolor={palette.background.default}
      minHeight={"100vh"}
      padding={isNonMobileScreen ? "25px" : "10px"}
    >
      <WidgetWrapper display="flex" gap="20px" flexDirection="column">
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => router.push(`/profile/${userId}`)}
        >
          <FlexBetween gap="1.25rem">
            <UserImage image={user.picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={palette.neutral.dark}
                fontWeight="500"
                pb="0.25rem"
                sx={{
                  "&:hover": {
                    color: palette.neutral.main,
                    cursor: "pointer",
                  },
                }}
              >
                {user.fname} {user.lname}
              </Typography>
              <Typography color={palette.neutral.medium}>
                {user.connections.length} Connections
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
            <LocationOnOutlined
              fontSize="medium"
              sx={{ color: palette.neutral.main }}
            />
            <Typography color={palette.neutral.medium}>
              {user.location}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined
              fontSize="medium"
              sx={{ color: palette.neutral.main }}
            />
            <Typography color={palette.neutral.medium}>
              {user.occupation}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={palette.neutral.medium}>
              {"Who's viewed your profile"}
            </Typography>
            <Typography color={palette.neutral.main} fontWeight="500">
              {user.viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={palette.neutral.medium}>
              Impressions of your post
            </Typography>
            <Typography color={palette.neutral.main} fontWeight="500">
              {user.impressions}
            </Typography>
          </FlexBetween>
        </Box>

        <Divider />

        <Box p="1rem 0">
          <Typography
            fontSize="1rem"
            color={palette.neutral.main}
            fontWeight="500"
            mb="1rem"
          >
            Social Profiles
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <Twitter color="action" fontSize="large" />
              <Box>
                <Typography color={palette.neutral.main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={palette.neutral.medium}>
                  Social Network
                </Typography>
              </Box>
            </FlexBetween>
            <IconWrapper>
              <EditOutlined sx={{ color: palette.neutral.main }} />
            </IconWrapper>
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <LinkedIn color="action" fontSize="large" />
              <Box>
                <Typography color={palette.neutral.main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={palette.neutral.medium}>
                  Network Platform
                </Typography>
              </Box>
            </FlexBetween>
            <IconWrapper>
              <EditOutlined sx={{ color: palette.neutral.main }} />
            </IconWrapper>
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    </Box>
  );
};

ProfilePage.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export const getServerSideProps = async (context: NextPageContext) => {
  const userId = context.query.userId as string;
  const req = context.req;
  //? The request from the client includes cookie named `accessToken`, that accessToken will be forwarded to the server by the Client Server for an authorized request
  const accessToken = req?.headers.cookie?.replace("accessToken=", "");
  //? In simple words, we are forwarding the cookie
  const user = await fetchUserData(userId, accessToken);
  return {
    props: {
      user: user || null,
    },
  };
};

export default ProfilePage;
