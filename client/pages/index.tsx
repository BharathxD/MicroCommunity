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
  return <Box></Box>;
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
