import { AppShell } from "@mantine/core";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell padding={"md"} header={<Header />} footer={<Footer />}>
      {children}
    </AppShell>
  );
};

export default HomePageLayout;
