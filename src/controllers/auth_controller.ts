import { isServer } from "lib/isServer";
import { makeAutoObservable } from "mobx";
import Router from "next/router";
import { AppStore } from "stores/app_store";

interface Options {
  appStore: AppStore;
}

export class AuthController {
  private appStore: AppStore;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    const { authStore } = this.appStore;
    return Boolean(authStore.token);
  }

  get isLoading() {
    const { authStore } = this.appStore;
    return !authStore.isReady;
  }

  get user() {
    const { authStore } = this.appStore;
    return authStore.user;
  }
}
