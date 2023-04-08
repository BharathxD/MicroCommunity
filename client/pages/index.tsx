import Connections from "@/components/widget/Connections";
import FriendList from "@/components/widget/FriendList";
import UserImage from "@/components/widget/UserImage";
import HomePageLayout from "@/layout/HomePageLayout";
import styles from "@/styles/Home.module.css";
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
          <FriendList userId={user?._id} />
        </Box>
      </Box>
    </Box>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
