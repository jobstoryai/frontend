import { makeAutoObservable } from "mobx";
import Router from "next/router";

import { AppStore } from "stores/AppStore";
import { isServer } from "lib/isServer";

interface Opts {
  appStore: AppStore;
}

export class AuthController {
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

  /**
   * Returns true if user is logged in
   */
  get isAuthenticated() {
    const { authStore } = this.appStore;
    return authStore.isAuthenticated
  }

  /**
   * Handles log out action
   */
  redirect = (path: string) => {
    isServer()
      ? null
      : Router.push(path);
  };
}
