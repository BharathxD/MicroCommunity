import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/state";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

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
  return (
    <>
      <Head>
        <title>MicroCommunity</title>
        <meta
          name="viewport"
          content="minimum-scalable=1, initial-scale=1, width=device-width"
        ></meta>
      </Head>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "light" }}
        >
          <PersistGate loading={null} persistor={persistStore(store)} />
          <Notifications />
          {getLayout(
            <main>
              <Component {...pageProps} />
            </main>
          )}
        </MantineProvider>
      </Provider>
    </>
  );
}
