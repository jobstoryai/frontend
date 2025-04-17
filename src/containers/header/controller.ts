import { makeAutoObservable } from "mobx";
import Router from "next/router";

import { AppStore } from "stores/app_store";

interface Opts {
  appStore: AppStore;
}

export class HeaderController {
  private appStore: AppStore;

  constructor({ appStore }: Opts) {
    this.appStore = appStore;
    makeAutoObservable(this);
  }

  /**
   * Handles log out action
   */
  logout = () => {
    const { authStore } = this.appStore;
    authStore.logout();
    Router.push("/login");
  };
}
