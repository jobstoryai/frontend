import { api } from "client-rest-framework";
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";

import { isServer } from "lib/isServer";

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "config";
import { LocalStorageManager } from "lib/token_manager/localstorage_manager";

export class HTTPClient extends api.AxiosHTTPClient {
  getExtraHeaders() {
    // TODO: use config
    const accessToken = LocalStorageManager.get("__at");
    return { Authorization: `Bearer ${accessToken}` };
  }

  onUnauthenticate = () => {
    LocalStorageManager.remove("__at");
    LocalStorageManager.remove("__rt");

    if (!isServer() && window.location.pathname !== "/login") {
      Router.push("/login");
    }
  };
}
