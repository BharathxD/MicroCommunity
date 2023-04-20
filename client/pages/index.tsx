import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, ReactElement, memo, useEffect } from "react";
import Connections from "@/components/Connections";
import AdvertWidget from "@/components/Advertisements/AdvertWidget";
import UserWidget from "@/components/User/UserWidget";
import HomePageLayout from "@/layout/HomePageLayout";
import { useDispatch, useSelector } from "react-redux";
import { Post, ReduxState } from "@/types/state.types";
import { useRouter } from "next/router";
import Loading from "@/components/UI/Loading";
import Head from "next/head";
import { getPosts } from "@/api/post.api";

import MiddleSectionWrapper from "@/components/Wrappers/HomepageWrappers/MiddleSectionWrapper";
import HompageWrapper from "@/components/Wrappers/HomepageWrappers/HomepageWrapper";
import { setLoading, setProfile } from "@/state/auth";
import LeftSectionWrapper from "@/components/Wrappers/HomepageWrappers/LeftSectionWrapper";
import PostsWidget from "@/components/Post/PostsWidget";
import UserPostWidget from "@/components/Post/UserPostWidget";
import { NextPageContext } from "next";

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props): ReactElement {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const router = useRouter();
  const token = useSelector((state: ReduxState) => state.token);
  const { palette } = useTheme();
  const isLoading = useSelector((state: ReduxState) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfile(null));
    dispatch(setLoading({ isLoading: true }));
    if (!token) {
      router.push("/auth");
    } else {
      dispatch(setLoading({ isLoading: false }));
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Homepage</title>
      </Head>
      <Box
        bgcolor={palette.background.default}
        minHeight={"100vh"}
        padding={isNonMobileScreen ? "0" : "10px"}
      >
        {isLoading && <Loading />}
        {!isLoading && (
          <HompageWrapper>
            <LeftSectionWrapper>
              <UserWidget />
            </LeftSectionWrapper>
            <Divider orientation="vertical" flexItem />
            <MiddleSectionWrapper>
              <UserPostWidget />
              <Divider sx={{ margin: "1.25rem" }} />
              <PostsWidget />
            </MiddleSectionWrapper>
            <Divider orientation="vertical" flexItem />
            {isNonMobileScreen && (
              <Box sx={{ flexBasis: "26%" }}>
                <Connections />
                <Box sx={{ m: "2rem" }} />
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

export const getServerSideProps = async (context: NextPageContext) => {
  const req = context.req;
  // @ts-ignore
  const accessToken = req?.cookies?.accessToken;
  const posts: Post[] | null = await getPosts(accessToken);
  console.log(posts);
  return {
    props: {
      posts: null,
    },
  };
};
