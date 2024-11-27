import { api } from "client-rest-framework";
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";

import { isServer } from "lib/isServer";

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "config";

export class HTTPClient extends api.AxiosHTTPClient {
  getExtraHeaders() {
    const { [ACCESS_TOKEN_COOKIE_NAME]: access } = parseCookies();
    return { Authorization: `Bearer ${access}` };
  }

  onUnauthenticate = () => {
    destroyCookie(null, REFRESH_TOKEN_COOKIE_NAME);
    destroyCookie(null, ACCESS_TOKEN_COOKIE_NAME);
    if (!isServer() && window.location.pathname !== "/login") {
      Router.push("/login");
    }
  };
}

