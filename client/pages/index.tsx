import HomePageLayout from "@/layout/HomePageLayout";
import styles from "@/styles/Home.module.css";
import { ReactElement } from "react";

export default function Home() {
  return <main className={styles.main}>Server Initialized</main>;
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
