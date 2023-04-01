import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NextPage } from "next";
import { ReactElement, ReactNode, useMemo } from "react";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "@/state";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useSelector } from "react-redux";
import { themeSettings } from "@/themes/theme";
import { ReduxState } from "@/types/state.types";

//? Adding get Layout into the NextPage props

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

//? Including the modified component into the App props

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const mode = useSelector((state: ReduxState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <Head>
        <title>MicroCommunity</title>
        <meta
          name="viewport"
          content="minimum-scalable=1, initial-scale=1, width=device-width"
        ></meta>
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)} />
          <Notifications />
          <ThemeProvider theme={theme}>
            {getLayout(
              <main>
                <Component {...pageProps} />
              </main>
            )}
          </ThemeProvider>
        </Provider>
      </MantineProvider>
    </>
  );
}
