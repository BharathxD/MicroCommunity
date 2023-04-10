import { Box, useMediaQuery } from "@mui/material";
import { ReactElement } from "react";
import Connections from "@/components/Connections";
import AdvertWidget from "@/components/widget/AdvertWidget";
import UserWidget from "@/components/widget/UserWidget";
import HomePageLayout from "@/layout/HomePageLayout";

export default function Home(): ReactElement {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  return (
    <Box sx={{ padding: "2rem 6%" }}>
      <Box
        sx={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flexBasis: isNonMobileScreen ? "26%" : "100%" }}>
          <UserWidget />
        </Box>
        <Box
          sx={{
            flexBasis: isNonMobileScreen ? "42%" : "100%",
            mt: isNonMobileScreen ? 0 : "2rem",
          }}
        >
          {/* Placeholder for the main content */}
        </Box>
        {isNonMobileScreen && (
          <Box sx={{ flexBasis: "26%" }}>
            <Connections />
            <Box sx={{ m: "2rem 0" }} />
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
