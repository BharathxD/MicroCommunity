import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, ReactElement, useEffect, useState } from "react";
import Connections from "@/components/Connections";
import AdvertWidget from "@/components/widget/AdvertWidget";
import UserWidget from "@/components/widget/UserWidget";
import HomePageLayout from "@/layout/HomePageLayout";
import { useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";
import { useRouter } from "next/router";
import Loading from "@/components/UI/Loading";
import Head from "next/head";
import LeftSectionWrapper from "@/components/UI/HomepageWrappers/LeftSectionWrapper";
import MiddleSectionWrapper from "@/components/UI/HomepageWrappers/MiddleSectionWrapper";
import HompageWrapper from "@/components/UI/HomepageWrappers/HomepageWrapper";

export default function Home(): ReactElement {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const router = useRouter();
  const token = useSelector((state: ReduxState) => state.token);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { palette } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!token) {
        router.push("/auth");
      } else {
        setIsLoading(false);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [token, router]);

  return (
    <Fragment>
      <Head>
        <title>Homepage</title>
      </Head>
      <Box
        bgcolor={palette.background.default}
        minHeight={"100vh"}
        p={"0.5rem"}
      >
        {isLoading && <Loading />}
        {!isLoading && (
          <HompageWrapper>
            <LeftSectionWrapper>
              <UserWidget />
            </LeftSectionWrapper>
            <Divider orientation="vertical" flexItem />
            <MiddleSectionWrapper>
              {/* Placeholder for the main content */}
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
