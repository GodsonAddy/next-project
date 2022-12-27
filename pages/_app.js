import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";
import Head from "next/head";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DrawerContextProvider } from "../context/drawer.context";

const clientSideEmotionCache = createEmotionCache();
function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>

            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <DrawerContextProvider>
                <Component {...pageProps} />
              </DrawerContextProvider>
              <ToastContainer />
            </ThemeProvider>
          </CacheProvider>
        </Auth>
      ) : (
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>

          <ThemeProvider theme={theme}>
            <CssBaseline />

            <DrawerContextProvider>
              <Component {...pageProps} />
            </DrawerContextProvider>

            <ToastContainer />
          </ThemeProvider>
        </CacheProvider>
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
