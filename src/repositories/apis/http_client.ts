import { api } from "client-rest-framework";
import Router from "next/router";

import { isServer } from "lib/is_server";
import { TokenStore } from "lib/token_manager/token_store";

const tokenStore = new TokenStore();

export class HTTPClient extends api.AxiosHTTPClient {
  getExtraHeaders() {
    const accessToken = tokenStore.get();
    return { Authorization: `Bearer ${accessToken}` };
  }

  onUnauthenticate = () => {
    debugger;
    tokenStore.remove();

    if (!isServer() && window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  };
}
