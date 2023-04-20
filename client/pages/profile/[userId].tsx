import { fetchUserData } from "@/api/user.api";
import Loading from "@/components/UI/Loading";
import UserWidget from "@/components/User/UserWidget";
import HomePageLayout from "@/layout/HomePageLayout";
import { setProfile } from "@/state/auth";
import { ReduxState, User } from "@/types/state.types";
import { useMediaQuery, Box, useTheme } from "@mui/material";
import { NextPageContext } from "next";
import router, { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  user: User;
};

const ProfilePage = () => {
  const { userId } = useRouter().query;
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state: ReduxState) => state.profile);

  const { palette } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await fetchUserData(userId);
        if (user) {
          dispatch(setProfile(user));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <Box
        bgcolor={palette.background.default}
        minHeight={"100vh"}
        padding={isNonMobileScreen ? "25px" : "10px"}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <Box
      bgcolor={palette.background.default}
      minHeight={"100vh"}
      padding={isNonMobileScreen ? "25px" : "10px"}
    >
      <UserWidget externalUserId={user?._id} />
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
