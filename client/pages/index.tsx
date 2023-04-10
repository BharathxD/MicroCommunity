import HomePageLayout from "@/layout/HomePageLayout";
import { Box, useMediaQuery } from "@mui/material";
import Connections from "@/components/Connections";
import { ReactElement } from "react";
import AdvertWidget from "@/components/widget/AdvertWidget";
import UserWidget from "@/components/widget/UserWidget";

export default function Home() {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        ></Box>
        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <Connections />
            <Box m="2rem 0" />
            <AdvertWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
