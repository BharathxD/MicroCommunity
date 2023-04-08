import HomePageLayout from "@/layout/HomePageLayout";
import { Box, useMediaQuery } from "@mui/material";
import Connections from "@/components/Connections";
import { ReactElement } from "react";

export default function Home() {
  const isNonMobileScreen = useMediaQuery("(min-width1000px)");
  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box>
          <Connections />
        </Box>
      </Box>
    </Box>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
