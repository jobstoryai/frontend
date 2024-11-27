import { makeAutoObservable } from "mobx";
import Router from "next/router";

import { AppStore } from "stores/AppStore";

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
   * Returns true if user object isn't loaded yet
   */
  get isLoading() {
    const { authStore } = this.appStore;
    return authStore.isLoading;
  }

  get user() {
    const { authStore } = this.appStore;
    return authStore.me;
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

