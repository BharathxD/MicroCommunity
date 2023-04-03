import HomePageLayout from "@/layout/HomePageLayout";
import store from "@/state";
import { setMode } from "@/state/auth";
import styles from "@/styles/Home.module.css";
import { ReduxState } from "@/types/state.types";
import { createTheme } from "@mui/material";
import { ReactElement, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const changeModeHandler = () => {
    dispatch(setMode());
  };
  const { mode } = useSelector((state: ReduxState) => state);
  return <main className={styles.main}>Server Initialized</main>;
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
