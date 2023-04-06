import { AppShell } from "@mantine/core";
import React, { useMemo } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";
import { themeSettings } from "@/themes/theme";
import { Box, ThemeProvider, createTheme } from "@mui/material";

const HomePageLayout = ({
  children,
  withoutHeader,
}: {
  children: React.ReactNode;
  withoutHeader?: boolean;
}) => {
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      {!withoutHeader && (
        <AppShell padding={"md"} header={<Header />}>
          {children}
        </AppShell>
      )}
      {withoutHeader && <>{children}</>}
    </ThemeProvider>
  );
};

export default HomePageLayout;
