import { AppShell } from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { ReduxState } from "@/types/state.types";
import { themeSettings } from "@/themes/theme";

import Header from "./Header";
import { setUser } from "@/state/auth";

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

  useEffect(() => {
    const fetchUser = async () => {
      if (!_id || !token) {
        return;
      }
      const response = await fetch(
        `http://localhost:4000/api/user/search/${_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setUser(data));
    };
    fetchUser();
  }, [_id, dispatch, token]);

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
