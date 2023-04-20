import { fetchUserData } from "@/api/user.api";
import Connections from "@/components/Connections";
import PostsWidget from "@/components/Post/PostsWidget";
import UserPostWidget from "@/components/Post/UserPostWidget";
import UserWidget from "@/components/User/UserWidget";
import HompageWrapper from "@/components/Wrappers/HomepageWrappers/HomepageWrapper";
import HomePageLayout from "@/layout/HomePageLayout";
import { setProfile, setUser } from "@/state/auth";
import { ReduxState, User } from "@/types/state.types";
import { useMediaQuery, Box, useTheme } from "@mui/material";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  userId: string;
  user: User;
};

const ProfilePage = ({ userId, user }: Props) => {
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const userProfile = useSelector((state: ReduxState) => state.profile);
  const { palette } = useTheme();
  useEffect(() => {
    dispatch(setProfile(user));
  }, []);

  return (
    <Box
      bgcolor={palette.background.default}
      minHeight={"100vh"}
      padding={isNonMobileScreen ? "25px" : "10px"}
    >
      <Box display="flex" justifyContent="center" gap="50px">
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget externalUserId={user._id} />
          <Box m="2rem 0" />
          <Connections userId={user._id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>
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
