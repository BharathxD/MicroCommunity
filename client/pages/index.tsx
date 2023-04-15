import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, ReactElement, useEffect } from "react";
import Connections from "@/components/Connections";
import AdvertWidget from "@/components/Advertisements/AdvertWidget";
import UserWidget from "@/components/User/UserWidget";
import HomePageLayout from "@/layout/HomePageLayout";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";
import { useRouter } from "next/router";
import Loading from "@/components/UI/Loading";
import Head from "next/head";
import MiddleSectionWrapper from "@/components/Wrappers/HomepageWrappers/MiddleSectionWrapper";
import HompageWrapper from "@/components/Wrappers/HomepageWrappers/HomepageWrapper";
import { setLoading } from "@/state/auth";
import LeftSectionWrapper from "@/components/Wrappers/HomepageWrappers/LeftSectionWrapper";
import PostsWidget from "@/components/Post/PostsWidget";

export default function Home(): ReactElement {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const router = useRouter();
  const token = useSelector((state: ReduxState) => state.token);
  const { palette } = useTheme();
  const isLoading = useSelector((state: ReduxState) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    const timeout = setTimeout(() => {
      if (!token) {
        router.push("/auth");
      } else {
        dispatch(setLoading({ isLoading: false }));
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [token, router, dispatch]);

  return (
    <Fragment>
      <Head>
        <title>Homepage</title>
      </Head>
      <Box bgcolor={palette.background.default} minHeight={"100vh"}>
        {isLoading && <Loading />}
        {!isLoading && (
          <HompageWrapper>
            <LeftSectionWrapper>
              <UserWidget />
            </LeftSectionWrapper>
            <Divider orientation="vertical" flexItem />
            <MiddleSectionWrapper>
              <PostsWidget />
            </MiddleSectionWrapper>
            <Divider orientation="vertical" flexItem />
            {isNonMobileScreen && (
              <Box sx={{ flexBasis: "26%" }}>
                <Connections />
                <Box sx={{ m: "2rem 0" }} />
                <AdvertWidget />
              </Box>
            )}
          </HompageWrapper>
        )}
      </Box>
    </Fragment>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
