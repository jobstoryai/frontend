import React from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import type { AppProps } from "next/app";

import { NoSSR } from "components/NoSSR";
import { LayoutContainer } from "containers/layout";
import { ToastContainer } from "stores/toast_store/toast_container";
import { AppStoreProvider } from "stores/use_store";
import { AuthProvider } from "lib/auth_provider";

import "styles/globals.css";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

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
