import { fetchUserData } from "@/api/user.api";
import Connections from "@/components/Connections";
import PostsWidget from "@/components/Post/PostsWidget";
import UserPostWidget from "@/components/Post/UserPostWidget";
import UserWidget from "@/components/User/UserWidget";
import HompageWrapper from "@/components/Wrappers/HomepageWrappers/HomepageWrapper";
import HomePageLayout from "@/layout/HomePageLayout";
import { ReduxState, User } from "@/types/state.types";
import { useMediaQuery, Box, useTheme } from "@mui/material";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  userId: string;
  user: User;
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useRouter().query;
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserData(userId);
      setUser(user);
    };
    fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <Box
      bgcolor={palette.background.default}
      minHeight={"100vh"}
      padding={isNonMobileScreen ? "25px" : "10px"}
    >
      <Box display="flex" justifyContent="center" gap="50px">
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget />
          <Box m="2rem 0" />
          <Connections />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <UserPostWidget />
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
