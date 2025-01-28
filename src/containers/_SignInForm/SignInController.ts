import { makeAutoObservable } from "mobx";
import Router from "next/router";

import { AppStore } from "stores/AppStore";


interface Opts {
  appStore: AppStore;
}

export class SignInController {
  private appStore: AppStore;

  constructor({ appStore }: Opts) {
    this.appStore = appStore;
    makeAutoObservable(this);
  }

  login = async (credentials: { username: string, password: string }) => {
    const { authStore, toastStore } = this.appStore;
    try {
      await authStore.login(credentials);
      toastStore.show("success", "Successful login");
      Router.replace("/");
    } catch (err) {
      toastStore.show(
        "error",
        "Unsuccessful login. Please check your credentials"
      );
    }
  };
}

