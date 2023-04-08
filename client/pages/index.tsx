import FriendList from "@/components/widget/FriendList";
import HomePageLayout from "@/layout/HomePageLayout";
import { ReduxState } from "@/types/state.types";
import { Box, useMediaQuery } from "@mui/material";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const isNonMobileScreen = useMediaQuery("(min-width1000px)");
  const user = useSelector((state: ReduxState) => {
    return state.user;
  });
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
          <FriendList />
          <p>{user?._id}</p>
        </Box>
      </Box>
    </Box>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
