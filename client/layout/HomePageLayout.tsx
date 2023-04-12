import { AppShell } from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { ReduxState } from "@/types/state.types";
import { themeSettings } from "@/themes/theme";

import Header from "./Header";
import { setUser } from "@/state/auth";
import { fetchUserData } from "@/api/user.api";

interface Props {
  children: React.ReactNode;
  withoutHeader?: boolean;
}

const HomePageLayout: React.FC<Props> = ({
  children,
  withoutHeader = false,
}) => {
  const { mode, _id, token } = useSelector((state: ReduxState) => {
    return { mode: state.mode, _id: state.user?._id, token: state.token };
  });
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();
  const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserData(_id);
      memoizedDispatch(setUser(data));
    };
    fetchUser();
  }, [_id, memoizedDispatch, token]);

  const content = withoutHeader ? (
    children
  ) : (
    <AppShell padding="md" header={<Header />}>
      {children}
    </AppShell>
  );

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
};

export default HomePageLayout;
