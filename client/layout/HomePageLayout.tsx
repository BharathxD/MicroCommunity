import React, { Fragment, useEffect, useMemo } from "react";
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
  const { mode, user, token } = useSelector((state: ReduxState) => {
    return { mode: state.mode, user: state.user, token: state.token };
  });

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserData(user?._id); // Use optional chaining to access _id safely
      dispatch(setUser(data));
    };
    if (user?._id) {
      // Add a null check before calling fetchUserData
      fetchUser();
    }
  }, [user, dispatch]);

  const content = withoutHeader ? (
    children
  ) : (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
};

export default HomePageLayout;
