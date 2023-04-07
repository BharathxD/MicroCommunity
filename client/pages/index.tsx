import Conenctions from "@/components/widget/Connections";
import UserImage from "@/components/widget/UserImage";
import HomePageLayout from "@/layout/HomePageLayout";
import styles from "@/styles/Home.module.css";
import { ReduxState } from "@/types/state.types";
import { Box, useMediaQuery } from "@mui/material";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const isNonMobileScreen = useMediaQuery("(min-width1000px)");
  const { _id, picturePath } = useSelector((state: ReduxState) => {
    return { _id: state.user?._id, picturePath: state.user?.picturePath };
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
          <Conenctions />
        </Box>
      </Box>
    </Box>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
