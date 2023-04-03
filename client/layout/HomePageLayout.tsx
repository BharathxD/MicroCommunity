import { AppShell } from "@mantine/core";
import React, { useMemo } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";
import { themeSettings } from "@/themes/theme";
import { ThemeProvider, createTheme } from "@mui/material";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <AppShell padding={"md"} header={<Header />}>
        {children}
      </AppShell>
    </ThemeProvider>
  );
};

export default HomePageLayout;
