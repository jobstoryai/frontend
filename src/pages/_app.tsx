import React from "react";
import type { AppProps } from "next/app";

import { NoSSR } from "components/NoSSR";
import { LayoutContainer } from "containers/Layout";
import { ToastContainer } from "stores/toast_store/toast_container";
import { AppStoreProvider } from "stores/use_store";
import { AuthProvider } from "lib/auth_provider";

import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSSR>
      <AppStoreProvider>
        <AuthProvider>
          <LayoutContainer>
            <Component {...pageProps} />
          </LayoutContainer>
          <ToastContainer />
        </AuthProvider>
      </AppStoreProvider>
    </NoSSR>
  );
}
